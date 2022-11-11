import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMenuSuggestions, NewMenuSuggestions } from '../menu-suggestions.model';

export type PartialUpdateMenuSuggestions = Partial<IMenuSuggestions> & Pick<IMenuSuggestions, 'id'>;

type RestOf<T extends IMenuSuggestions | NewMenuSuggestions> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestMenuSuggestions = RestOf<IMenuSuggestions>;

export type NewRestMenuSuggestions = RestOf<NewMenuSuggestions>;

export type PartialUpdateRestMenuSuggestions = RestOf<PartialUpdateMenuSuggestions>;

export type EntityResponseType = HttpResponse<IMenuSuggestions>;
export type EntityArrayResponseType = HttpResponse<IMenuSuggestions[]>;

@Injectable({ providedIn: 'root' })
export class MenuSuggestionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/menu-suggestions', 'hmsnutritionist');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(menuSuggestions: NewMenuSuggestions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuSuggestions);
    return this.http
      .post<RestMenuSuggestions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(menuSuggestions: IMenuSuggestions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuSuggestions);
    return this.http
      .put<RestMenuSuggestions>(`${this.resourceUrl}/${this.getMenuSuggestionsIdentifier(menuSuggestions)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(menuSuggestions: PartialUpdateMenuSuggestions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuSuggestions);
    return this.http
      .patch<RestMenuSuggestions>(`${this.resourceUrl}/${this.getMenuSuggestionsIdentifier(menuSuggestions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMenuSuggestions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMenuSuggestions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMenuSuggestionsIdentifier(menuSuggestions: Pick<IMenuSuggestions, 'id'>): number {
    return menuSuggestions.id;
  }

  compareMenuSuggestions(o1: Pick<IMenuSuggestions, 'id'> | null, o2: Pick<IMenuSuggestions, 'id'> | null): boolean {
    return o1 && o2 ? this.getMenuSuggestionsIdentifier(o1) === this.getMenuSuggestionsIdentifier(o2) : o1 === o2;
  }

  addMenuSuggestionsToCollectionIfMissing<Type extends Pick<IMenuSuggestions, 'id'>>(
    menuSuggestionsCollection: Type[],
    ...menuSuggestionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const menuSuggestions: Type[] = menuSuggestionsToCheck.filter(isPresent);
    if (menuSuggestions.length > 0) {
      const menuSuggestionsCollectionIdentifiers = menuSuggestionsCollection.map(
        menuSuggestionsItem => this.getMenuSuggestionsIdentifier(menuSuggestionsItem)!
      );
      const menuSuggestionsToAdd = menuSuggestions.filter(menuSuggestionsItem => {
        const menuSuggestionsIdentifier = this.getMenuSuggestionsIdentifier(menuSuggestionsItem);
        if (menuSuggestionsCollectionIdentifiers.includes(menuSuggestionsIdentifier)) {
          return false;
        }
        menuSuggestionsCollectionIdentifiers.push(menuSuggestionsIdentifier);
        return true;
      });
      return [...menuSuggestionsToAdd, ...menuSuggestionsCollection];
    }
    return menuSuggestionsCollection;
  }

  protected convertDateFromClient<T extends IMenuSuggestions | NewMenuSuggestions | PartialUpdateMenuSuggestions>(
    menuSuggestions: T
  ): RestOf<T> {
    return {
      ...menuSuggestions,
      createdDate: menuSuggestions.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restMenuSuggestions: RestMenuSuggestions): IMenuSuggestions {
    return {
      ...restMenuSuggestions,
      createdDate: restMenuSuggestions.createdDate ? dayjs(restMenuSuggestions.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMenuSuggestions>): HttpResponse<IMenuSuggestions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMenuSuggestions[]>): HttpResponse<IMenuSuggestions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
