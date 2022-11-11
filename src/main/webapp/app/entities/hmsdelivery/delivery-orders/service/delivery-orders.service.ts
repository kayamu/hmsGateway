import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDeliveryOrders, NewDeliveryOrders } from '../delivery-orders.model';

export type PartialUpdateDeliveryOrders = Partial<IDeliveryOrders> & Pick<IDeliveryOrders, 'id'>;

type RestOf<T extends IDeliveryOrders | NewDeliveryOrders> = Omit<T, 'deliveryDate' | 'requestDate' | 'createdDate'> & {
  deliveryDate?: string | null;
  requestDate?: string | null;
  createdDate?: string | null;
};

export type RestDeliveryOrders = RestOf<IDeliveryOrders>;

export type NewRestDeliveryOrders = RestOf<NewDeliveryOrders>;

export type PartialUpdateRestDeliveryOrders = RestOf<PartialUpdateDeliveryOrders>;

export type EntityResponseType = HttpResponse<IDeliveryOrders>;
export type EntityArrayResponseType = HttpResponse<IDeliveryOrders[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryOrdersService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/delivery-orders', 'hmsdelivery');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(deliveryOrders: NewDeliveryOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryOrders);
    return this.http
      .post<RestDeliveryOrders>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(deliveryOrders: IDeliveryOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryOrders);
    return this.http
      .put<RestDeliveryOrders>(`${this.resourceUrl}/${this.getDeliveryOrdersIdentifier(deliveryOrders)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(deliveryOrders: PartialUpdateDeliveryOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryOrders);
    return this.http
      .patch<RestDeliveryOrders>(`${this.resourceUrl}/${this.getDeliveryOrdersIdentifier(deliveryOrders)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDeliveryOrders>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDeliveryOrders[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDeliveryOrdersIdentifier(deliveryOrders: Pick<IDeliveryOrders, 'id'>): number {
    return deliveryOrders.id;
  }

  compareDeliveryOrders(o1: Pick<IDeliveryOrders, 'id'> | null, o2: Pick<IDeliveryOrders, 'id'> | null): boolean {
    return o1 && o2 ? this.getDeliveryOrdersIdentifier(o1) === this.getDeliveryOrdersIdentifier(o2) : o1 === o2;
  }

  addDeliveryOrdersToCollectionIfMissing<Type extends Pick<IDeliveryOrders, 'id'>>(
    deliveryOrdersCollection: Type[],
    ...deliveryOrdersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const deliveryOrders: Type[] = deliveryOrdersToCheck.filter(isPresent);
    if (deliveryOrders.length > 0) {
      const deliveryOrdersCollectionIdentifiers = deliveryOrdersCollection.map(
        deliveryOrdersItem => this.getDeliveryOrdersIdentifier(deliveryOrdersItem)!
      );
      const deliveryOrdersToAdd = deliveryOrders.filter(deliveryOrdersItem => {
        const deliveryOrdersIdentifier = this.getDeliveryOrdersIdentifier(deliveryOrdersItem);
        if (deliveryOrdersCollectionIdentifiers.includes(deliveryOrdersIdentifier)) {
          return false;
        }
        deliveryOrdersCollectionIdentifiers.push(deliveryOrdersIdentifier);
        return true;
      });
      return [...deliveryOrdersToAdd, ...deliveryOrdersCollection];
    }
    return deliveryOrdersCollection;
  }

  protected convertDateFromClient<T extends IDeliveryOrders | NewDeliveryOrders | PartialUpdateDeliveryOrders>(
    deliveryOrders: T
  ): RestOf<T> {
    return {
      ...deliveryOrders,
      deliveryDate: deliveryOrders.deliveryDate?.format(DATE_FORMAT) ?? null,
      requestDate: deliveryOrders.requestDate?.format(DATE_FORMAT) ?? null,
      createdDate: deliveryOrders.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDeliveryOrders: RestDeliveryOrders): IDeliveryOrders {
    return {
      ...restDeliveryOrders,
      deliveryDate: restDeliveryOrders.deliveryDate ? dayjs(restDeliveryOrders.deliveryDate) : undefined,
      requestDate: restDeliveryOrders.requestDate ? dayjs(restDeliveryOrders.requestDate) : undefined,
      createdDate: restDeliveryOrders.createdDate ? dayjs(restDeliveryOrders.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDeliveryOrders>): HttpResponse<IDeliveryOrders> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDeliveryOrders[]>): HttpResponse<IDeliveryOrders[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
