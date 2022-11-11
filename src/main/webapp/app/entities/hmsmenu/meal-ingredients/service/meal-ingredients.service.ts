import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMealIngredients, NewMealIngredients } from '../meal-ingredients.model';

export type PartialUpdateMealIngredients = Partial<IMealIngredients> & Pick<IMealIngredients, 'id'>;

type RestOf<T extends IMealIngredients | NewMealIngredients> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestMealIngredients = RestOf<IMealIngredients>;

export type NewRestMealIngredients = RestOf<NewMealIngredients>;

export type PartialUpdateRestMealIngredients = RestOf<PartialUpdateMealIngredients>;

export type EntityResponseType = HttpResponse<IMealIngredients>;
export type EntityArrayResponseType = HttpResponse<IMealIngredients[]>;

@Injectable({ providedIn: 'root' })
export class MealIngredientsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/meal-ingredients', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(mealIngredients: NewMealIngredients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mealIngredients);
    return this.http
      .post<RestMealIngredients>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(mealIngredients: IMealIngredients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mealIngredients);
    return this.http
      .put<RestMealIngredients>(`${this.resourceUrl}/${this.getMealIngredientsIdentifier(mealIngredients)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(mealIngredients: PartialUpdateMealIngredients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mealIngredients);
    return this.http
      .patch<RestMealIngredients>(`${this.resourceUrl}/${this.getMealIngredientsIdentifier(mealIngredients)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMealIngredients>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMealIngredients[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMealIngredientsIdentifier(mealIngredients: Pick<IMealIngredients, 'id'>): number {
    return mealIngredients.id;
  }

  compareMealIngredients(o1: Pick<IMealIngredients, 'id'> | null, o2: Pick<IMealIngredients, 'id'> | null): boolean {
    return o1 && o2 ? this.getMealIngredientsIdentifier(o1) === this.getMealIngredientsIdentifier(o2) : o1 === o2;
  }

  addMealIngredientsToCollectionIfMissing<Type extends Pick<IMealIngredients, 'id'>>(
    mealIngredientsCollection: Type[],
    ...mealIngredientsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const mealIngredients: Type[] = mealIngredientsToCheck.filter(isPresent);
    if (mealIngredients.length > 0) {
      const mealIngredientsCollectionIdentifiers = mealIngredientsCollection.map(
        mealIngredientsItem => this.getMealIngredientsIdentifier(mealIngredientsItem)!
      );
      const mealIngredientsToAdd = mealIngredients.filter(mealIngredientsItem => {
        const mealIngredientsIdentifier = this.getMealIngredientsIdentifier(mealIngredientsItem);
        if (mealIngredientsCollectionIdentifiers.includes(mealIngredientsIdentifier)) {
          return false;
        }
        mealIngredientsCollectionIdentifiers.push(mealIngredientsIdentifier);
        return true;
      });
      return [...mealIngredientsToAdd, ...mealIngredientsCollection];
    }
    return mealIngredientsCollection;
  }

  protected convertDateFromClient<T extends IMealIngredients | NewMealIngredients | PartialUpdateMealIngredients>(
    mealIngredients: T
  ): RestOf<T> {
    return {
      ...mealIngredients,
      createdDate: mealIngredients.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restMealIngredients: RestMealIngredients): IMealIngredients {
    return {
      ...restMealIngredients,
      createdDate: restMealIngredients.createdDate ? dayjs(restMealIngredients.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMealIngredients>): HttpResponse<IMealIngredients> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMealIngredients[]>): HttpResponse<IMealIngredients[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
