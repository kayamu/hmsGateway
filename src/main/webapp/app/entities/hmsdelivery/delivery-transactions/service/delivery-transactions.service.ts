import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDeliveryTransactions, NewDeliveryTransactions } from '../delivery-transactions.model';

export type PartialUpdateDeliveryTransactions = Partial<IDeliveryTransactions> & Pick<IDeliveryTransactions, 'id'>;

type RestOf<T extends IDeliveryTransactions | NewDeliveryTransactions> = Omit<
  T,
  'statusChangedDate' | 'transactionDate' | 'createdDate'
> & {
  statusChangedDate?: string | null;
  transactionDate?: string | null;
  createdDate?: string | null;
};

export type RestDeliveryTransactions = RestOf<IDeliveryTransactions>;

export type NewRestDeliveryTransactions = RestOf<NewDeliveryTransactions>;

export type PartialUpdateRestDeliveryTransactions = RestOf<PartialUpdateDeliveryTransactions>;

export type EntityResponseType = HttpResponse<IDeliveryTransactions>;
export type EntityArrayResponseType = HttpResponse<IDeliveryTransactions[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryTransactionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/delivery-transactions', 'hmsdelivery');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(deliveryTransactions: NewDeliveryTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryTransactions);
    return this.http
      .post<RestDeliveryTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(deliveryTransactions: IDeliveryTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryTransactions);
    return this.http
      .put<RestDeliveryTransactions>(`${this.resourceUrl}/${this.getDeliveryTransactionsIdentifier(deliveryTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(deliveryTransactions: PartialUpdateDeliveryTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryTransactions);
    return this.http
      .patch<RestDeliveryTransactions>(`${this.resourceUrl}/${this.getDeliveryTransactionsIdentifier(deliveryTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDeliveryTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDeliveryTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDeliveryTransactionsIdentifier(deliveryTransactions: Pick<IDeliveryTransactions, 'id'>): number {
    return deliveryTransactions.id;
  }

  compareDeliveryTransactions(o1: Pick<IDeliveryTransactions, 'id'> | null, o2: Pick<IDeliveryTransactions, 'id'> | null): boolean {
    return o1 && o2 ? this.getDeliveryTransactionsIdentifier(o1) === this.getDeliveryTransactionsIdentifier(o2) : o1 === o2;
  }

  addDeliveryTransactionsToCollectionIfMissing<Type extends Pick<IDeliveryTransactions, 'id'>>(
    deliveryTransactionsCollection: Type[],
    ...deliveryTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const deliveryTransactions: Type[] = deliveryTransactionsToCheck.filter(isPresent);
    if (deliveryTransactions.length > 0) {
      const deliveryTransactionsCollectionIdentifiers = deliveryTransactionsCollection.map(
        deliveryTransactionsItem => this.getDeliveryTransactionsIdentifier(deliveryTransactionsItem)!
      );
      const deliveryTransactionsToAdd = deliveryTransactions.filter(deliveryTransactionsItem => {
        const deliveryTransactionsIdentifier = this.getDeliveryTransactionsIdentifier(deliveryTransactionsItem);
        if (deliveryTransactionsCollectionIdentifiers.includes(deliveryTransactionsIdentifier)) {
          return false;
        }
        deliveryTransactionsCollectionIdentifiers.push(deliveryTransactionsIdentifier);
        return true;
      });
      return [...deliveryTransactionsToAdd, ...deliveryTransactionsCollection];
    }
    return deliveryTransactionsCollection;
  }

  protected convertDateFromClient<T extends IDeliveryTransactions | NewDeliveryTransactions | PartialUpdateDeliveryTransactions>(
    deliveryTransactions: T
  ): RestOf<T> {
    return {
      ...deliveryTransactions,
      statusChangedDate: deliveryTransactions.statusChangedDate?.format(DATE_FORMAT) ?? null,
      transactionDate: deliveryTransactions.transactionDate?.format(DATE_FORMAT) ?? null,
      createdDate: deliveryTransactions.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDeliveryTransactions: RestDeliveryTransactions): IDeliveryTransactions {
    return {
      ...restDeliveryTransactions,
      statusChangedDate: restDeliveryTransactions.statusChangedDate ? dayjs(restDeliveryTransactions.statusChangedDate) : undefined,
      transactionDate: restDeliveryTransactions.transactionDate ? dayjs(restDeliveryTransactions.transactionDate) : undefined,
      createdDate: restDeliveryTransactions.createdDate ? dayjs(restDeliveryTransactions.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDeliveryTransactions>): HttpResponse<IDeliveryTransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDeliveryTransactions[]>): HttpResponse<IDeliveryTransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
