import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIngredients, NewIngredients } from '../ingredients.model';

export type PartialUpdateIngredients = Partial<IIngredients> & Pick<IIngredients, 'id'>;

type RestOf<T extends IIngredients | NewIngredients> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestIngredients = RestOf<IIngredients>;

export type NewRestIngredients = RestOf<NewIngredients>;

export type PartialUpdateRestIngredients = RestOf<PartialUpdateIngredients>;

export type EntityResponseType = HttpResponse<IIngredients>;
export type EntityArrayResponseType = HttpResponse<IIngredients[]>;

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ingredients', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ingredients: NewIngredients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ingredients);
    return this.http
      .post<RestIngredients>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(ingredients: IIngredients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ingredients);
    return this.http
      .put<RestIngredients>(`${this.resourceUrl}/${this.getIngredientsIdentifier(ingredients)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(ingredients: PartialUpdateIngredients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ingredients);
    return this.http
      .patch<RestIngredients>(`${this.resourceUrl}/${this.getIngredientsIdentifier(ingredients)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestIngredients>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestIngredients[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getIngredientsIdentifier(ingredients: Pick<IIngredients, 'id'>): number {
    return ingredients.id;
  }

  compareIngredients(o1: Pick<IIngredients, 'id'> | null, o2: Pick<IIngredients, 'id'> | null): boolean {
    return o1 && o2 ? this.getIngredientsIdentifier(o1) === this.getIngredientsIdentifier(o2) : o1 === o2;
  }

  addIngredientsToCollectionIfMissing<Type extends Pick<IIngredients, 'id'>>(
    ingredientsCollection: Type[],
    ...ingredientsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ingredients: Type[] = ingredientsToCheck.filter(isPresent);
    if (ingredients.length > 0) {
      const ingredientsCollectionIdentifiers = ingredientsCollection.map(
        ingredientsItem => this.getIngredientsIdentifier(ingredientsItem)!
      );
      const ingredientsToAdd = ingredients.filter(ingredientsItem => {
        const ingredientsIdentifier = this.getIngredientsIdentifier(ingredientsItem);
        if (ingredientsCollectionIdentifiers.includes(ingredientsIdentifier)) {
          return false;
        }
        ingredientsCollectionIdentifiers.push(ingredientsIdentifier);
        return true;
      });
      return [...ingredientsToAdd, ...ingredientsCollection];
    }
    return ingredientsCollection;
  }

  protected convertDateFromClient<T extends IIngredients | NewIngredients | PartialUpdateIngredients>(ingredients: T): RestOf<T> {
    return {
      ...ingredients,
      createdDate: ingredients.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restIngredients: RestIngredients): IIngredients {
    return {
      ...restIngredients,
      createdDate: restIngredients.createdDate ? dayjs(restIngredients.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestIngredients>): HttpResponse<IIngredients> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestIngredients[]>): HttpResponse<IIngredients[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
