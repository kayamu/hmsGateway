import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInvoiceDetails, NewInvoiceDetails } from '../invoice-details.model';

export type PartialUpdateInvoiceDetails = Partial<IInvoiceDetails> & Pick<IInvoiceDetails, 'id'>;

type RestOf<T extends IInvoiceDetails | NewInvoiceDetails> = Omit<T, 'subscriptionStartingDate' | 'createdDate'> & {
  subscriptionStartingDate?: string | null;
  createdDate?: string | null;
};

export type RestInvoiceDetails = RestOf<IInvoiceDetails>;

export type NewRestInvoiceDetails = RestOf<NewInvoiceDetails>;

export type PartialUpdateRestInvoiceDetails = RestOf<PartialUpdateInvoiceDetails>;

export type EntityResponseType = HttpResponse<IInvoiceDetails>;
export type EntityArrayResponseType = HttpResponse<IInvoiceDetails[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/invoice-details', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(invoiceDetails: NewInvoiceDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoiceDetails);
    return this.http
      .post<RestInvoiceDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(invoiceDetails: IInvoiceDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoiceDetails);
    return this.http
      .put<RestInvoiceDetails>(`${this.resourceUrl}/${this.getInvoiceDetailsIdentifier(invoiceDetails)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(invoiceDetails: PartialUpdateInvoiceDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoiceDetails);
    return this.http
      .patch<RestInvoiceDetails>(`${this.resourceUrl}/${this.getInvoiceDetailsIdentifier(invoiceDetails)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestInvoiceDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestInvoiceDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInvoiceDetailsIdentifier(invoiceDetails: Pick<IInvoiceDetails, 'id'>): number {
    return invoiceDetails.id;
  }

  compareInvoiceDetails(o1: Pick<IInvoiceDetails, 'id'> | null, o2: Pick<IInvoiceDetails, 'id'> | null): boolean {
    return o1 && o2 ? this.getInvoiceDetailsIdentifier(o1) === this.getInvoiceDetailsIdentifier(o2) : o1 === o2;
  }

  addInvoiceDetailsToCollectionIfMissing<Type extends Pick<IInvoiceDetails, 'id'>>(
    invoiceDetailsCollection: Type[],
    ...invoiceDetailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const invoiceDetails: Type[] = invoiceDetailsToCheck.filter(isPresent);
    if (invoiceDetails.length > 0) {
      const invoiceDetailsCollectionIdentifiers = invoiceDetailsCollection.map(
        invoiceDetailsItem => this.getInvoiceDetailsIdentifier(invoiceDetailsItem)!
      );
      const invoiceDetailsToAdd = invoiceDetails.filter(invoiceDetailsItem => {
        const invoiceDetailsIdentifier = this.getInvoiceDetailsIdentifier(invoiceDetailsItem);
        if (invoiceDetailsCollectionIdentifiers.includes(invoiceDetailsIdentifier)) {
          return false;
        }
        invoiceDetailsCollectionIdentifiers.push(invoiceDetailsIdentifier);
        return true;
      });
      return [...invoiceDetailsToAdd, ...invoiceDetailsCollection];
    }
    return invoiceDetailsCollection;
  }

  protected convertDateFromClient<T extends IInvoiceDetails | NewInvoiceDetails | PartialUpdateInvoiceDetails>(
    invoiceDetails: T
  ): RestOf<T> {
    return {
      ...invoiceDetails,
      subscriptionStartingDate: invoiceDetails.subscriptionStartingDate?.format(DATE_FORMAT) ?? null,
      createdDate: invoiceDetails.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restInvoiceDetails: RestInvoiceDetails): IInvoiceDetails {
    return {
      ...restInvoiceDetails,
      subscriptionStartingDate: restInvoiceDetails.subscriptionStartingDate
        ? dayjs(restInvoiceDetails.subscriptionStartingDate)
        : undefined,
      createdDate: restInvoiceDetails.createdDate ? dayjs(restInvoiceDetails.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestInvoiceDetails>): HttpResponse<IInvoiceDetails> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestInvoiceDetails[]>): HttpResponse<IInvoiceDetails[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
