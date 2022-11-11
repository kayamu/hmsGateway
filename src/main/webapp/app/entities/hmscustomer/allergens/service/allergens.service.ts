import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAllergens, NewAllergens } from '../allergens.model';

export type PartialUpdateAllergens = Partial<IAllergens> & Pick<IAllergens, 'id'>;

type RestOf<T extends IAllergens | NewAllergens> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestAllergens = RestOf<IAllergens>;

export type NewRestAllergens = RestOf<NewAllergens>;

export type PartialUpdateRestAllergens = RestOf<PartialUpdateAllergens>;

export type EntityResponseType = HttpResponse<IAllergens>;
export type EntityArrayResponseType = HttpResponse<IAllergens[]>;

@Injectable({ providedIn: 'root' })
export class AllergensService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/allergens', 'hmscustomer');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(allergens: NewAllergens): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(allergens);
    return this.http
      .post<RestAllergens>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(allergens: IAllergens): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(allergens);
    return this.http
      .put<RestAllergens>(`${this.resourceUrl}/${this.getAllergensIdentifier(allergens)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(allergens: PartialUpdateAllergens): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(allergens);
    return this.http
      .patch<RestAllergens>(`${this.resourceUrl}/${this.getAllergensIdentifier(allergens)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAllergens>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAllergens[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAllergensIdentifier(allergens: Pick<IAllergens, 'id'>): number {
    return allergens.id;
  }

  compareAllergens(o1: Pick<IAllergens, 'id'> | null, o2: Pick<IAllergens, 'id'> | null): boolean {
    return o1 && o2 ? this.getAllergensIdentifier(o1) === this.getAllergensIdentifier(o2) : o1 === o2;
  }

  addAllergensToCollectionIfMissing<Type extends Pick<IAllergens, 'id'>>(
    allergensCollection: Type[],
    ...allergensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const allergens: Type[] = allergensToCheck.filter(isPresent);
    if (allergens.length > 0) {
      const allergensCollectionIdentifiers = allergensCollection.map(allergensItem => this.getAllergensIdentifier(allergensItem)!);
      const allergensToAdd = allergens.filter(allergensItem => {
        const allergensIdentifier = this.getAllergensIdentifier(allergensItem);
        if (allergensCollectionIdentifiers.includes(allergensIdentifier)) {
          return false;
        }
        allergensCollectionIdentifiers.push(allergensIdentifier);
        return true;
      });
      return [...allergensToAdd, ...allergensCollection];
    }
    return allergensCollection;
  }

  protected convertDateFromClient<T extends IAllergens | NewAllergens | PartialUpdateAllergens>(allergens: T): RestOf<T> {
    return {
      ...allergens,
      createdDate: allergens.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAllergens: RestAllergens): IAllergens {
    return {
      ...restAllergens,
      createdDate: restAllergens.createdDate ? dayjs(restAllergens.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAllergens>): HttpResponse<IAllergens> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAllergens[]>): HttpResponse<IAllergens[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
