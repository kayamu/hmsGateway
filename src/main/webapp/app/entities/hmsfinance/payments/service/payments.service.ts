import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPayments, NewPayments } from '../payments.model';

export type PartialUpdatePayments = Partial<IPayments> & Pick<IPayments, 'id'>;

type RestOf<T extends IPayments | NewPayments> = Omit<T, 'operationDate' | 'createdDate'> & {
  operationDate?: string | null;
  createdDate?: string | null;
};

export type RestPayments = RestOf<IPayments>;

export type NewRestPayments = RestOf<NewPayments>;

export type PartialUpdateRestPayments = RestOf<PartialUpdatePayments>;

export type EntityResponseType = HttpResponse<IPayments>;
export type EntityArrayResponseType = HttpResponse<IPayments[]>;

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(payments: NewPayments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payments);
    return this.http
      .post<RestPayments>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payments: IPayments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payments);
    return this.http
      .put<RestPayments>(`${this.resourceUrl}/${this.getPaymentsIdentifier(payments)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(payments: PartialUpdatePayments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payments);
    return this.http
      .patch<RestPayments>(`${this.resourceUrl}/${this.getPaymentsIdentifier(payments)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPayments>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPayments[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPaymentsIdentifier(payments: Pick<IPayments, 'id'>): number {
    return payments.id;
  }

  comparePayments(o1: Pick<IPayments, 'id'> | null, o2: Pick<IPayments, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentsIdentifier(o1) === this.getPaymentsIdentifier(o2) : o1 === o2;
  }

  addPaymentsToCollectionIfMissing<Type extends Pick<IPayments, 'id'>>(
    paymentsCollection: Type[],
    ...paymentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const payments: Type[] = paymentsToCheck.filter(isPresent);
    if (payments.length > 0) {
      const paymentsCollectionIdentifiers = paymentsCollection.map(paymentsItem => this.getPaymentsIdentifier(paymentsItem)!);
      const paymentsToAdd = payments.filter(paymentsItem => {
        const paymentsIdentifier = this.getPaymentsIdentifier(paymentsItem);
        if (paymentsCollectionIdentifiers.includes(paymentsIdentifier)) {
          return false;
        }
        paymentsCollectionIdentifiers.push(paymentsIdentifier);
        return true;
      });
      return [...paymentsToAdd, ...paymentsCollection];
    }
    return paymentsCollection;
  }

  protected convertDateFromClient<T extends IPayments | NewPayments | PartialUpdatePayments>(payments: T): RestOf<T> {
    return {
      ...payments,
      operationDate: payments.operationDate?.format(DATE_FORMAT) ?? null,
      createdDate: payments.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPayments: RestPayments): IPayments {
    return {
      ...restPayments,
      operationDate: restPayments.operationDate ? dayjs(restPayments.operationDate) : undefined,
      createdDate: restPayments.createdDate ? dayjs(restPayments.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPayments>): HttpResponse<IPayments> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPayments[]>): HttpResponse<IPayments[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
