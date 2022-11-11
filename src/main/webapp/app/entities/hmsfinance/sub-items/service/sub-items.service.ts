import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISubItems, NewSubItems } from '../sub-items.model';

export type PartialUpdateSubItems = Partial<ISubItems> & Pick<ISubItems, 'id'>;

type RestOf<T extends ISubItems | NewSubItems> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestSubItems = RestOf<ISubItems>;

export type NewRestSubItems = RestOf<NewSubItems>;

export type PartialUpdateRestSubItems = RestOf<PartialUpdateSubItems>;

export type EntityResponseType = HttpResponse<ISubItems>;
export type EntityArrayResponseType = HttpResponse<ISubItems[]>;

@Injectable({ providedIn: 'root' })
export class SubItemsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sub-items', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(subItems: NewSubItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subItems);
    return this.http
      .post<RestSubItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(subItems: ISubItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subItems);
    return this.http
      .put<RestSubItems>(`${this.resourceUrl}/${this.getSubItemsIdentifier(subItems)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(subItems: PartialUpdateSubItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subItems);
    return this.http
      .patch<RestSubItems>(`${this.resourceUrl}/${this.getSubItemsIdentifier(subItems)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSubItems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSubItems[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSubItemsIdentifier(subItems: Pick<ISubItems, 'id'>): number {
    return subItems.id;
  }

  compareSubItems(o1: Pick<ISubItems, 'id'> | null, o2: Pick<ISubItems, 'id'> | null): boolean {
    return o1 && o2 ? this.getSubItemsIdentifier(o1) === this.getSubItemsIdentifier(o2) : o1 === o2;
  }

  addSubItemsToCollectionIfMissing<Type extends Pick<ISubItems, 'id'>>(
    subItemsCollection: Type[],
    ...subItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const subItems: Type[] = subItemsToCheck.filter(isPresent);
    if (subItems.length > 0) {
      const subItemsCollectionIdentifiers = subItemsCollection.map(subItemsItem => this.getSubItemsIdentifier(subItemsItem)!);
      const subItemsToAdd = subItems.filter(subItemsItem => {
        const subItemsIdentifier = this.getSubItemsIdentifier(subItemsItem);
        if (subItemsCollectionIdentifiers.includes(subItemsIdentifier)) {
          return false;
        }
        subItemsCollectionIdentifiers.push(subItemsIdentifier);
        return true;
      });
      return [...subItemsToAdd, ...subItemsCollection];
    }
    return subItemsCollection;
  }

  protected convertDateFromClient<T extends ISubItems | NewSubItems | PartialUpdateSubItems>(subItems: T): RestOf<T> {
    return {
      ...subItems,
      createdDate: subItems.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSubItems: RestSubItems): ISubItems {
    return {
      ...restSubItems,
      createdDate: restSubItems.createdDate ? dayjs(restSubItems.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSubItems>): HttpResponse<ISubItems> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSubItems[]>): HttpResponse<ISubItems[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
