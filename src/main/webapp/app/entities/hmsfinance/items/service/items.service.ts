import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItems, NewItems } from '../items.model';

export type PartialUpdateItems = Partial<IItems> & Pick<IItems, 'id'>;

type RestOf<T extends IItems | NewItems> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestItems = RestOf<IItems>;

export type NewRestItems = RestOf<NewItems>;

export type PartialUpdateRestItems = RestOf<PartialUpdateItems>;

export type EntityResponseType = HttpResponse<IItems>;
export type EntityArrayResponseType = HttpResponse<IItems[]>;

@Injectable({ providedIn: 'root' })
export class ItemsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/items', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(items: NewItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(items);
    return this.http.post<RestItems>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(items: IItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(items);
    return this.http
      .put<RestItems>(`${this.resourceUrl}/${this.getItemsIdentifier(items)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(items: PartialUpdateItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(items);
    return this.http
      .patch<RestItems>(`${this.resourceUrl}/${this.getItemsIdentifier(items)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestItems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestItems[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getItemsIdentifier(items: Pick<IItems, 'id'>): number {
    return items.id;
  }

  compareItems(o1: Pick<IItems, 'id'> | null, o2: Pick<IItems, 'id'> | null): boolean {
    return o1 && o2 ? this.getItemsIdentifier(o1) === this.getItemsIdentifier(o2) : o1 === o2;
  }

  addItemsToCollectionIfMissing<Type extends Pick<IItems, 'id'>>(
    itemsCollection: Type[],
    ...itemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const items: Type[] = itemsToCheck.filter(isPresent);
    if (items.length > 0) {
      const itemsCollectionIdentifiers = itemsCollection.map(itemsItem => this.getItemsIdentifier(itemsItem)!);
      const itemsToAdd = items.filter(itemsItem => {
        const itemsIdentifier = this.getItemsIdentifier(itemsItem);
        if (itemsCollectionIdentifiers.includes(itemsIdentifier)) {
          return false;
        }
        itemsCollectionIdentifiers.push(itemsIdentifier);
        return true;
      });
      return [...itemsToAdd, ...itemsCollection];
    }
    return itemsCollection;
  }

  protected convertDateFromClient<T extends IItems | NewItems | PartialUpdateItems>(items: T): RestOf<T> {
    return {
      ...items,
      createdDate: items.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restItems: RestItems): IItems {
    return {
      ...restItems,
      createdDate: restItems.createdDate ? dayjs(restItems.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestItems>): HttpResponse<IItems> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestItems[]>): HttpResponse<IItems[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
