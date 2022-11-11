import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICustomerHealths, NewCustomerHealths } from '../customer-healths.model';

export type PartialUpdateCustomerHealths = Partial<ICustomerHealths> & Pick<ICustomerHealths, 'id'>;

type RestOf<T extends ICustomerHealths | NewCustomerHealths> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestCustomerHealths = RestOf<ICustomerHealths>;

export type NewRestCustomerHealths = RestOf<NewCustomerHealths>;

export type PartialUpdateRestCustomerHealths = RestOf<PartialUpdateCustomerHealths>;

export type EntityResponseType = HttpResponse<ICustomerHealths>;
export type EntityArrayResponseType = HttpResponse<ICustomerHealths[]>;

@Injectable({ providedIn: 'root' })
export class CustomerHealthsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/customer-healths', 'hmscustomer');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(customerHealths: NewCustomerHealths): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerHealths);
    return this.http
      .post<RestCustomerHealths>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(customerHealths: ICustomerHealths): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerHealths);
    return this.http
      .put<RestCustomerHealths>(`${this.resourceUrl}/${this.getCustomerHealthsIdentifier(customerHealths)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(customerHealths: PartialUpdateCustomerHealths): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerHealths);
    return this.http
      .patch<RestCustomerHealths>(`${this.resourceUrl}/${this.getCustomerHealthsIdentifier(customerHealths)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCustomerHealths>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCustomerHealths[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCustomerHealthsIdentifier(customerHealths: Pick<ICustomerHealths, 'id'>): number {
    return customerHealths.id;
  }

  compareCustomerHealths(o1: Pick<ICustomerHealths, 'id'> | null, o2: Pick<ICustomerHealths, 'id'> | null): boolean {
    return o1 && o2 ? this.getCustomerHealthsIdentifier(o1) === this.getCustomerHealthsIdentifier(o2) : o1 === o2;
  }

  addCustomerHealthsToCollectionIfMissing<Type extends Pick<ICustomerHealths, 'id'>>(
    customerHealthsCollection: Type[],
    ...customerHealthsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const customerHealths: Type[] = customerHealthsToCheck.filter(isPresent);
    if (customerHealths.length > 0) {
      const customerHealthsCollectionIdentifiers = customerHealthsCollection.map(
        customerHealthsItem => this.getCustomerHealthsIdentifier(customerHealthsItem)!
      );
      const customerHealthsToAdd = customerHealths.filter(customerHealthsItem => {
        const customerHealthsIdentifier = this.getCustomerHealthsIdentifier(customerHealthsItem);
        if (customerHealthsCollectionIdentifiers.includes(customerHealthsIdentifier)) {
          return false;
        }
        customerHealthsCollectionIdentifiers.push(customerHealthsIdentifier);
        return true;
      });
      return [...customerHealthsToAdd, ...customerHealthsCollection];
    }
    return customerHealthsCollection;
  }

  protected convertDateFromClient<T extends ICustomerHealths | NewCustomerHealths | PartialUpdateCustomerHealths>(
    customerHealths: T
  ): RestOf<T> {
    return {
      ...customerHealths,
      createdDate: customerHealths.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCustomerHealths: RestCustomerHealths): ICustomerHealths {
    return {
      ...restCustomerHealths,
      createdDate: restCustomerHealths.createdDate ? dayjs(restCustomerHealths.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCustomerHealths>): HttpResponse<ICustomerHealths> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCustomerHealths[]>): HttpResponse<ICustomerHealths[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
