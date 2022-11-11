import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContactAddresses, NewContactAddresses } from '../contact-addresses.model';

export type PartialUpdateContactAddresses = Partial<IContactAddresses> & Pick<IContactAddresses, 'id'>;

type RestOf<T extends IContactAddresses | NewContactAddresses> = Omit<T, 'contractStartDate' | 'createdDate'> & {
  contractStartDate?: string | null;
  createdDate?: string | null;
};

export type RestContactAddresses = RestOf<IContactAddresses>;

export type NewRestContactAddresses = RestOf<NewContactAddresses>;

export type PartialUpdateRestContactAddresses = RestOf<PartialUpdateContactAddresses>;

export type EntityResponseType = HttpResponse<IContactAddresses>;
export type EntityArrayResponseType = HttpResponse<IContactAddresses[]>;

@Injectable({ providedIn: 'root' })
export class ContactAddressesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contact-addresses', 'hmscontact');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contactAddresses: NewContactAddresses): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contactAddresses);
    return this.http
      .post<RestContactAddresses>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(contactAddresses: IContactAddresses): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contactAddresses);
    return this.http
      .put<RestContactAddresses>(`${this.resourceUrl}/${this.getContactAddressesIdentifier(contactAddresses)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(contactAddresses: PartialUpdateContactAddresses): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contactAddresses);
    return this.http
      .patch<RestContactAddresses>(`${this.resourceUrl}/${this.getContactAddressesIdentifier(contactAddresses)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestContactAddresses>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestContactAddresses[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContactAddressesIdentifier(contactAddresses: Pick<IContactAddresses, 'id'>): number {
    return contactAddresses.id;
  }

  compareContactAddresses(o1: Pick<IContactAddresses, 'id'> | null, o2: Pick<IContactAddresses, 'id'> | null): boolean {
    return o1 && o2 ? this.getContactAddressesIdentifier(o1) === this.getContactAddressesIdentifier(o2) : o1 === o2;
  }

  addContactAddressesToCollectionIfMissing<Type extends Pick<IContactAddresses, 'id'>>(
    contactAddressesCollection: Type[],
    ...contactAddressesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contactAddresses: Type[] = contactAddressesToCheck.filter(isPresent);
    if (contactAddresses.length > 0) {
      const contactAddressesCollectionIdentifiers = contactAddressesCollection.map(
        contactAddressesItem => this.getContactAddressesIdentifier(contactAddressesItem)!
      );
      const contactAddressesToAdd = contactAddresses.filter(contactAddressesItem => {
        const contactAddressesIdentifier = this.getContactAddressesIdentifier(contactAddressesItem);
        if (contactAddressesCollectionIdentifiers.includes(contactAddressesIdentifier)) {
          return false;
        }
        contactAddressesCollectionIdentifiers.push(contactAddressesIdentifier);
        return true;
      });
      return [...contactAddressesToAdd, ...contactAddressesCollection];
    }
    return contactAddressesCollection;
  }

  protected convertDateFromClient<T extends IContactAddresses | NewContactAddresses | PartialUpdateContactAddresses>(
    contactAddresses: T
  ): RestOf<T> {
    return {
      ...contactAddresses,
      contractStartDate: contactAddresses.contractStartDate?.format(DATE_FORMAT) ?? null,
      createdDate: contactAddresses.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restContactAddresses: RestContactAddresses): IContactAddresses {
    return {
      ...restContactAddresses,
      contractStartDate: restContactAddresses.contractStartDate ? dayjs(restContactAddresses.contractStartDate) : undefined,
      createdDate: restContactAddresses.createdDate ? dayjs(restContactAddresses.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestContactAddresses>): HttpResponse<IContactAddresses> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestContactAddresses[]>): HttpResponse<IContactAddresses[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
