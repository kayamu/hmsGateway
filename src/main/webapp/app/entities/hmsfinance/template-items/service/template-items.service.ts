import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITemplateItems, NewTemplateItems } from '../template-items.model';

export type PartialUpdateTemplateItems = Partial<ITemplateItems> & Pick<ITemplateItems, 'id'>;

type RestOf<T extends ITemplateItems | NewTemplateItems> = Omit<T, 'startDate' | 'dueDate' | 'createdDate'> & {
  startDate?: string | null;
  dueDate?: string | null;
  createdDate?: string | null;
};

export type RestTemplateItems = RestOf<ITemplateItems>;

export type NewRestTemplateItems = RestOf<NewTemplateItems>;

export type PartialUpdateRestTemplateItems = RestOf<PartialUpdateTemplateItems>;

export type EntityResponseType = HttpResponse<ITemplateItems>;
export type EntityArrayResponseType = HttpResponse<ITemplateItems[]>;

@Injectable({ providedIn: 'root' })
export class TemplateItemsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/template-items', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(templateItems: NewTemplateItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(templateItems);
    return this.http
      .post<RestTemplateItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(templateItems: ITemplateItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(templateItems);
    return this.http
      .put<RestTemplateItems>(`${this.resourceUrl}/${this.getTemplateItemsIdentifier(templateItems)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(templateItems: PartialUpdateTemplateItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(templateItems);
    return this.http
      .patch<RestTemplateItems>(`${this.resourceUrl}/${this.getTemplateItemsIdentifier(templateItems)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTemplateItems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTemplateItems[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTemplateItemsIdentifier(templateItems: Pick<ITemplateItems, 'id'>): number {
    return templateItems.id;
  }

  compareTemplateItems(o1: Pick<ITemplateItems, 'id'> | null, o2: Pick<ITemplateItems, 'id'> | null): boolean {
    return o1 && o2 ? this.getTemplateItemsIdentifier(o1) === this.getTemplateItemsIdentifier(o2) : o1 === o2;
  }

  addTemplateItemsToCollectionIfMissing<Type extends Pick<ITemplateItems, 'id'>>(
    templateItemsCollection: Type[],
    ...templateItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const templateItems: Type[] = templateItemsToCheck.filter(isPresent);
    if (templateItems.length > 0) {
      const templateItemsCollectionIdentifiers = templateItemsCollection.map(
        templateItemsItem => this.getTemplateItemsIdentifier(templateItemsItem)!
      );
      const templateItemsToAdd = templateItems.filter(templateItemsItem => {
        const templateItemsIdentifier = this.getTemplateItemsIdentifier(templateItemsItem);
        if (templateItemsCollectionIdentifiers.includes(templateItemsIdentifier)) {
          return false;
        }
        templateItemsCollectionIdentifiers.push(templateItemsIdentifier);
        return true;
      });
      return [...templateItemsToAdd, ...templateItemsCollection];
    }
    return templateItemsCollection;
  }

  protected convertDateFromClient<T extends ITemplateItems | NewTemplateItems | PartialUpdateTemplateItems>(templateItems: T): RestOf<T> {
    return {
      ...templateItems,
      startDate: templateItems.startDate?.format(DATE_FORMAT) ?? null,
      dueDate: templateItems.dueDate?.format(DATE_FORMAT) ?? null,
      createdDate: templateItems.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTemplateItems: RestTemplateItems): ITemplateItems {
    return {
      ...restTemplateItems,
      startDate: restTemplateItems.startDate ? dayjs(restTemplateItems.startDate) : undefined,
      dueDate: restTemplateItems.dueDate ? dayjs(restTemplateItems.dueDate) : undefined,
      createdDate: restTemplateItems.createdDate ? dayjs(restTemplateItems.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTemplateItems>): HttpResponse<ITemplateItems> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTemplateItems[]>): HttpResponse<ITemplateItems[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
