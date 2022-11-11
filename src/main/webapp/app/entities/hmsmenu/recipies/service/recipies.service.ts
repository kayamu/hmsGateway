import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRecipies, NewRecipies } from '../recipies.model';

export type PartialUpdateRecipies = Partial<IRecipies> & Pick<IRecipies, 'id'>;

type RestOf<T extends IRecipies | NewRecipies> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestRecipies = RestOf<IRecipies>;

export type NewRestRecipies = RestOf<NewRecipies>;

export type PartialUpdateRestRecipies = RestOf<PartialUpdateRecipies>;

export type EntityResponseType = HttpResponse<IRecipies>;
export type EntityArrayResponseType = HttpResponse<IRecipies[]>;

@Injectable({ providedIn: 'root' })
export class RecipiesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/recipies', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(recipies: NewRecipies): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recipies);
    return this.http
      .post<RestRecipies>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(recipies: IRecipies): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recipies);
    return this.http
      .put<RestRecipies>(`${this.resourceUrl}/${this.getRecipiesIdentifier(recipies)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(recipies: PartialUpdateRecipies): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recipies);
    return this.http
      .patch<RestRecipies>(`${this.resourceUrl}/${this.getRecipiesIdentifier(recipies)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestRecipies>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRecipies[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRecipiesIdentifier(recipies: Pick<IRecipies, 'id'>): number {
    return recipies.id;
  }

  compareRecipies(o1: Pick<IRecipies, 'id'> | null, o2: Pick<IRecipies, 'id'> | null): boolean {
    return o1 && o2 ? this.getRecipiesIdentifier(o1) === this.getRecipiesIdentifier(o2) : o1 === o2;
  }

  addRecipiesToCollectionIfMissing<Type extends Pick<IRecipies, 'id'>>(
    recipiesCollection: Type[],
    ...recipiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const recipies: Type[] = recipiesToCheck.filter(isPresent);
    if (recipies.length > 0) {
      const recipiesCollectionIdentifiers = recipiesCollection.map(recipiesItem => this.getRecipiesIdentifier(recipiesItem)!);
      const recipiesToAdd = recipies.filter(recipiesItem => {
        const recipiesIdentifier = this.getRecipiesIdentifier(recipiesItem);
        if (recipiesCollectionIdentifiers.includes(recipiesIdentifier)) {
          return false;
        }
        recipiesCollectionIdentifiers.push(recipiesIdentifier);
        return true;
      });
      return [...recipiesToAdd, ...recipiesCollection];
    }
    return recipiesCollection;
  }

  protected convertDateFromClient<T extends IRecipies | NewRecipies | PartialUpdateRecipies>(recipies: T): RestOf<T> {
    return {
      ...recipies,
      createdDate: recipies.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restRecipies: RestRecipies): IRecipies {
    return {
      ...restRecipies,
      createdDate: restRecipies.createdDate ? dayjs(restRecipies.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRecipies>): HttpResponse<IRecipies> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRecipies[]>): HttpResponse<IRecipies[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
