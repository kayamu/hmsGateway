import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContacts, NewContacts } from '../contacts.model';

export type PartialUpdateContacts = Partial<IContacts> & Pick<IContacts, 'id'>;

type RestOf<T extends IContacts | NewContacts> = Omit<T, 'birthdate' | 'createdDate'> & {
  birthdate?: string | null;
  createdDate?: string | null;
};

export type RestContacts = RestOf<IContacts>;

export type NewRestContacts = RestOf<NewContacts>;

export type PartialUpdateRestContacts = RestOf<PartialUpdateContacts>;

export type EntityResponseType = HttpResponse<IContacts>;
export type EntityArrayResponseType = HttpResponse<IContacts[]>;

@Injectable({ providedIn: 'root' })
export class ContactsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contacts', 'hmscontact');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contacts: NewContacts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contacts);
    return this.http
      .post<RestContacts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(contacts: IContacts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contacts);
    return this.http
      .put<RestContacts>(`${this.resourceUrl}/${this.getContactsIdentifier(contacts)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(contacts: PartialUpdateContacts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contacts);
    return this.http
      .patch<RestContacts>(`${this.resourceUrl}/${this.getContactsIdentifier(contacts)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestContacts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestContacts[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContactsIdentifier(contacts: Pick<IContacts, 'id'>): number {
    return contacts.id;
  }

  compareContacts(o1: Pick<IContacts, 'id'> | null, o2: Pick<IContacts, 'id'> | null): boolean {
    return o1 && o2 ? this.getContactsIdentifier(o1) === this.getContactsIdentifier(o2) : o1 === o2;
  }

  addContactsToCollectionIfMissing<Type extends Pick<IContacts, 'id'>>(
    contactsCollection: Type[],
    ...contactsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contacts: Type[] = contactsToCheck.filter(isPresent);
    if (contacts.length > 0) {
      const contactsCollectionIdentifiers = contactsCollection.map(contactsItem => this.getContactsIdentifier(contactsItem)!);
      const contactsToAdd = contacts.filter(contactsItem => {
        const contactsIdentifier = this.getContactsIdentifier(contactsItem);
        if (contactsCollectionIdentifiers.includes(contactsIdentifier)) {
          return false;
        }
        contactsCollectionIdentifiers.push(contactsIdentifier);
        return true;
      });
      return [...contactsToAdd, ...contactsCollection];
    }
    return contactsCollection;
  }

  protected convertDateFromClient<T extends IContacts | NewContacts | PartialUpdateContacts>(contacts: T): RestOf<T> {
    return {
      ...contacts,
      birthdate: contacts.birthdate?.format(DATE_FORMAT) ?? null,
      createdDate: contacts.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restContacts: RestContacts): IContacts {
    return {
      ...restContacts,
      birthdate: restContacts.birthdate ? dayjs(restContacts.birthdate) : undefined,
      createdDate: restContacts.createdDate ? dayjs(restContacts.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestContacts>): HttpResponse<IContacts> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestContacts[]>): HttpResponse<IContacts[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
