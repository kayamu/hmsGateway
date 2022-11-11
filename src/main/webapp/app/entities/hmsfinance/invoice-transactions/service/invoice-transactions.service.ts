import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInvoiceTransactions, NewInvoiceTransactions } from '../invoice-transactions.model';

export type PartialUpdateInvoiceTransactions = Partial<IInvoiceTransactions> & Pick<IInvoiceTransactions, 'id'>;

type RestOf<T extends IInvoiceTransactions | NewInvoiceTransactions> = Omit<T, 'statusChangedDate' | 'transactionDate' | 'createdDate'> & {
  statusChangedDate?: string | null;
  transactionDate?: string | null;
  createdDate?: string | null;
};

export type RestInvoiceTransactions = RestOf<IInvoiceTransactions>;

export type NewRestInvoiceTransactions = RestOf<NewInvoiceTransactions>;

export type PartialUpdateRestInvoiceTransactions = RestOf<PartialUpdateInvoiceTransactions>;

export type EntityResponseType = HttpResponse<IInvoiceTransactions>;
export type EntityArrayResponseType = HttpResponse<IInvoiceTransactions[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceTransactionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/invoice-transactions', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(invoiceTransactions: NewInvoiceTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoiceTransactions);
    return this.http
      .post<RestInvoiceTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(invoiceTransactions: IInvoiceTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoiceTransactions);
    return this.http
      .put<RestInvoiceTransactions>(`${this.resourceUrl}/${this.getInvoiceTransactionsIdentifier(invoiceTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(invoiceTransactions: PartialUpdateInvoiceTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoiceTransactions);
    return this.http
      .patch<RestInvoiceTransactions>(`${this.resourceUrl}/${this.getInvoiceTransactionsIdentifier(invoiceTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestInvoiceTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestInvoiceTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInvoiceTransactionsIdentifier(invoiceTransactions: Pick<IInvoiceTransactions, 'id'>): number {
    return invoiceTransactions.id;
  }

  compareInvoiceTransactions(o1: Pick<IInvoiceTransactions, 'id'> | null, o2: Pick<IInvoiceTransactions, 'id'> | null): boolean {
    return o1 && o2 ? this.getInvoiceTransactionsIdentifier(o1) === this.getInvoiceTransactionsIdentifier(o2) : o1 === o2;
  }

  addInvoiceTransactionsToCollectionIfMissing<Type extends Pick<IInvoiceTransactions, 'id'>>(
    invoiceTransactionsCollection: Type[],
    ...invoiceTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const invoiceTransactions: Type[] = invoiceTransactionsToCheck.filter(isPresent);
    if (invoiceTransactions.length > 0) {
      const invoiceTransactionsCollectionIdentifiers = invoiceTransactionsCollection.map(
        invoiceTransactionsItem => this.getInvoiceTransactionsIdentifier(invoiceTransactionsItem)!
      );
      const invoiceTransactionsToAdd = invoiceTransactions.filter(invoiceTransactionsItem => {
        const invoiceTransactionsIdentifier = this.getInvoiceTransactionsIdentifier(invoiceTransactionsItem);
        if (invoiceTransactionsCollectionIdentifiers.includes(invoiceTransactionsIdentifier)) {
          return false;
        }
        invoiceTransactionsCollectionIdentifiers.push(invoiceTransactionsIdentifier);
        return true;
      });
      return [...invoiceTransactionsToAdd, ...invoiceTransactionsCollection];
    }
    return invoiceTransactionsCollection;
  }

  protected convertDateFromClient<T extends IInvoiceTransactions | NewInvoiceTransactions | PartialUpdateInvoiceTransactions>(
    invoiceTransactions: T
  ): RestOf<T> {
    return {
      ...invoiceTransactions,
      statusChangedDate: invoiceTransactions.statusChangedDate?.format(DATE_FORMAT) ?? null,
      transactionDate: invoiceTransactions.transactionDate?.format(DATE_FORMAT) ?? null,
      createdDate: invoiceTransactions.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restInvoiceTransactions: RestInvoiceTransactions): IInvoiceTransactions {
    return {
      ...restInvoiceTransactions,
      statusChangedDate: restInvoiceTransactions.statusChangedDate ? dayjs(restInvoiceTransactions.statusChangedDate) : undefined,
      transactionDate: restInvoiceTransactions.transactionDate ? dayjs(restInvoiceTransactions.transactionDate) : undefined,
      createdDate: restInvoiceTransactions.createdDate ? dayjs(restInvoiceTransactions.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestInvoiceTransactions>): HttpResponse<IInvoiceTransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestInvoiceTransactions[]>): HttpResponse<IInvoiceTransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
