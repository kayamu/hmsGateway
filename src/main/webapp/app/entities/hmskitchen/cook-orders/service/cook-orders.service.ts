import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICookOrders, NewCookOrders } from '../cook-orders.model';

export type PartialUpdateCookOrders = Partial<ICookOrders> & Pick<ICookOrders, 'id'>;

type RestOf<T extends ICookOrders | NewCookOrders> = Omit<T, 'requestDate' | 'createdDate'> & {
  requestDate?: string | null;
  createdDate?: string | null;
};

export type RestCookOrders = RestOf<ICookOrders>;

export type NewRestCookOrders = RestOf<NewCookOrders>;

export type PartialUpdateRestCookOrders = RestOf<PartialUpdateCookOrders>;

export type EntityResponseType = HttpResponse<ICookOrders>;
export type EntityArrayResponseType = HttpResponse<ICookOrders[]>;

@Injectable({ providedIn: 'root' })
export class CookOrdersService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cook-orders', 'hmskitchen');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cookOrders: NewCookOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cookOrders);
    return this.http
      .post<RestCookOrders>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cookOrders: ICookOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cookOrders);
    return this.http
      .put<RestCookOrders>(`${this.resourceUrl}/${this.getCookOrdersIdentifier(cookOrders)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cookOrders: PartialUpdateCookOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cookOrders);
    return this.http
      .patch<RestCookOrders>(`${this.resourceUrl}/${this.getCookOrdersIdentifier(cookOrders)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCookOrders>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCookOrders[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCookOrdersIdentifier(cookOrders: Pick<ICookOrders, 'id'>): number {
    return cookOrders.id;
  }

  compareCookOrders(o1: Pick<ICookOrders, 'id'> | null, o2: Pick<ICookOrders, 'id'> | null): boolean {
    return o1 && o2 ? this.getCookOrdersIdentifier(o1) === this.getCookOrdersIdentifier(o2) : o1 === o2;
  }

  addCookOrdersToCollectionIfMissing<Type extends Pick<ICookOrders, 'id'>>(
    cookOrdersCollection: Type[],
    ...cookOrdersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cookOrders: Type[] = cookOrdersToCheck.filter(isPresent);
    if (cookOrders.length > 0) {
      const cookOrdersCollectionIdentifiers = cookOrdersCollection.map(cookOrdersItem => this.getCookOrdersIdentifier(cookOrdersItem)!);
      const cookOrdersToAdd = cookOrders.filter(cookOrdersItem => {
        const cookOrdersIdentifier = this.getCookOrdersIdentifier(cookOrdersItem);
        if (cookOrdersCollectionIdentifiers.includes(cookOrdersIdentifier)) {
          return false;
        }
        cookOrdersCollectionIdentifiers.push(cookOrdersIdentifier);
        return true;
      });
      return [...cookOrdersToAdd, ...cookOrdersCollection];
    }
    return cookOrdersCollection;
  }

  protected convertDateFromClient<T extends ICookOrders | NewCookOrders | PartialUpdateCookOrders>(cookOrders: T): RestOf<T> {
    return {
      ...cookOrders,
      requestDate: cookOrders.requestDate?.format(DATE_FORMAT) ?? null,
      createdDate: cookOrders.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCookOrders: RestCookOrders): ICookOrders {
    return {
      ...restCookOrders,
      requestDate: restCookOrders.requestDate ? dayjs(restCookOrders.requestDate) : undefined,
      createdDate: restCookOrders.createdDate ? dayjs(restCookOrders.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCookOrders>): HttpResponse<ICookOrders> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCookOrders[]>): HttpResponse<ICookOrders[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
