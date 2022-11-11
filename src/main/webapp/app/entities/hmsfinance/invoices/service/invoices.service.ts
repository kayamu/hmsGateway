import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInvoices, NewInvoices } from '../invoices.model';

export type PartialUpdateInvoices = Partial<IInvoices> & Pick<IInvoices, 'id'>;

type RestOf<T extends IInvoices | NewInvoices> = Omit<T, 'requestDate' | 'invoiceDate' | 'createdDate'> & {
  requestDate?: string | null;
  invoiceDate?: string | null;
  createdDate?: string | null;
};

export type RestInvoices = RestOf<IInvoices>;

export type NewRestInvoices = RestOf<NewInvoices>;

export type PartialUpdateRestInvoices = RestOf<PartialUpdateInvoices>;

export type EntityResponseType = HttpResponse<IInvoices>;
export type EntityArrayResponseType = HttpResponse<IInvoices[]>;

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/invoices', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(invoices: NewInvoices): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoices);
    return this.http
      .post<RestInvoices>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(invoices: IInvoices): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoices);
    return this.http
      .put<RestInvoices>(`${this.resourceUrl}/${this.getInvoicesIdentifier(invoices)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(invoices: PartialUpdateInvoices): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoices);
    return this.http
      .patch<RestInvoices>(`${this.resourceUrl}/${this.getInvoicesIdentifier(invoices)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestInvoices>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestInvoices[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInvoicesIdentifier(invoices: Pick<IInvoices, 'id'>): number {
    return invoices.id;
  }

  compareInvoices(o1: Pick<IInvoices, 'id'> | null, o2: Pick<IInvoices, 'id'> | null): boolean {
    return o1 && o2 ? this.getInvoicesIdentifier(o1) === this.getInvoicesIdentifier(o2) : o1 === o2;
  }

  addInvoicesToCollectionIfMissing<Type extends Pick<IInvoices, 'id'>>(
    invoicesCollection: Type[],
    ...invoicesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const invoices: Type[] = invoicesToCheck.filter(isPresent);
    if (invoices.length > 0) {
      const invoicesCollectionIdentifiers = invoicesCollection.map(invoicesItem => this.getInvoicesIdentifier(invoicesItem)!);
      const invoicesToAdd = invoices.filter(invoicesItem => {
        const invoicesIdentifier = this.getInvoicesIdentifier(invoicesItem);
        if (invoicesCollectionIdentifiers.includes(invoicesIdentifier)) {
          return false;
        }
        invoicesCollectionIdentifiers.push(invoicesIdentifier);
        return true;
      });
      return [...invoicesToAdd, ...invoicesCollection];
    }
    return invoicesCollection;
  }

  protected convertDateFromClient<T extends IInvoices | NewInvoices | PartialUpdateInvoices>(invoices: T): RestOf<T> {
    return {
      ...invoices,
      requestDate: invoices.requestDate?.format(DATE_FORMAT) ?? null,
      invoiceDate: invoices.invoiceDate?.format(DATE_FORMAT) ?? null,
      createdDate: invoices.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restInvoices: RestInvoices): IInvoices {
    return {
      ...restInvoices,
      requestDate: restInvoices.requestDate ? dayjs(restInvoices.requestDate) : undefined,
      invoiceDate: restInvoices.invoiceDate ? dayjs(restInvoices.invoiceDate) : undefined,
      createdDate: restInvoices.createdDate ? dayjs(restInvoices.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestInvoices>): HttpResponse<IInvoices> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestInvoices[]>): HttpResponse<IInvoices[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
