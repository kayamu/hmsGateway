import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMeals, NewMeals } from '../meals.model';

export type PartialUpdateMeals = Partial<IMeals> & Pick<IMeals, 'id'>;

type RestOf<T extends IMeals | NewMeals> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestMeals = RestOf<IMeals>;

export type NewRestMeals = RestOf<NewMeals>;

export type PartialUpdateRestMeals = RestOf<PartialUpdateMeals>;

export type EntityResponseType = HttpResponse<IMeals>;
export type EntityArrayResponseType = HttpResponse<IMeals[]>;

@Injectable({ providedIn: 'root' })
export class MealsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/meals', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(meals: NewMeals): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meals);
    return this.http.post<RestMeals>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(meals: IMeals): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meals);
    return this.http
      .put<RestMeals>(`${this.resourceUrl}/${this.getMealsIdentifier(meals)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(meals: PartialUpdateMeals): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meals);
    return this.http
      .patch<RestMeals>(`${this.resourceUrl}/${this.getMealsIdentifier(meals)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMeals>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMeals[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMealsIdentifier(meals: Pick<IMeals, 'id'>): number {
    return meals.id;
  }

  compareMeals(o1: Pick<IMeals, 'id'> | null, o2: Pick<IMeals, 'id'> | null): boolean {
    return o1 && o2 ? this.getMealsIdentifier(o1) === this.getMealsIdentifier(o2) : o1 === o2;
  }

  addMealsToCollectionIfMissing<Type extends Pick<IMeals, 'id'>>(
    mealsCollection: Type[],
    ...mealsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const meals: Type[] = mealsToCheck.filter(isPresent);
    if (meals.length > 0) {
      const mealsCollectionIdentifiers = mealsCollection.map(mealsItem => this.getMealsIdentifier(mealsItem)!);
      const mealsToAdd = meals.filter(mealsItem => {
        const mealsIdentifier = this.getMealsIdentifier(mealsItem);
        if (mealsCollectionIdentifiers.includes(mealsIdentifier)) {
          return false;
        }
        mealsCollectionIdentifiers.push(mealsIdentifier);
        return true;
      });
      return [...mealsToAdd, ...mealsCollection];
    }
    return mealsCollection;
  }

  protected convertDateFromClient<T extends IMeals | NewMeals | PartialUpdateMeals>(meals: T): RestOf<T> {
    return {
      ...meals,
      createdDate: meals.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restMeals: RestMeals): IMeals {
    return {
      ...restMeals,
      createdDate: restMeals.createdDate ? dayjs(restMeals.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMeals>): HttpResponse<IMeals> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMeals[]>): HttpResponse<IMeals[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
