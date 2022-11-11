import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INutriens, NewNutriens } from '../nutriens.model';

export type PartialUpdateNutriens = Partial<INutriens> & Pick<INutriens, 'id'>;

type RestOf<T extends INutriens | NewNutriens> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestNutriens = RestOf<INutriens>;

export type NewRestNutriens = RestOf<NewNutriens>;

export type PartialUpdateRestNutriens = RestOf<PartialUpdateNutriens>;

export type EntityResponseType = HttpResponse<INutriens>;
export type EntityArrayResponseType = HttpResponse<INutriens[]>;

@Injectable({ providedIn: 'root' })
export class NutriensService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nutriens', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nutriens: NewNutriens): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nutriens);
    return this.http
      .post<RestNutriens>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(nutriens: INutriens): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nutriens);
    return this.http
      .put<RestNutriens>(`${this.resourceUrl}/${this.getNutriensIdentifier(nutriens)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(nutriens: PartialUpdateNutriens): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nutriens);
    return this.http
      .patch<RestNutriens>(`${this.resourceUrl}/${this.getNutriensIdentifier(nutriens)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestNutriens>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestNutriens[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNutriensIdentifier(nutriens: Pick<INutriens, 'id'>): number {
    return nutriens.id;
  }

  compareNutriens(o1: Pick<INutriens, 'id'> | null, o2: Pick<INutriens, 'id'> | null): boolean {
    return o1 && o2 ? this.getNutriensIdentifier(o1) === this.getNutriensIdentifier(o2) : o1 === o2;
  }

  addNutriensToCollectionIfMissing<Type extends Pick<INutriens, 'id'>>(
    nutriensCollection: Type[],
    ...nutriensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const nutriens: Type[] = nutriensToCheck.filter(isPresent);
    if (nutriens.length > 0) {
      const nutriensCollectionIdentifiers = nutriensCollection.map(nutriensItem => this.getNutriensIdentifier(nutriensItem)!);
      const nutriensToAdd = nutriens.filter(nutriensItem => {
        const nutriensIdentifier = this.getNutriensIdentifier(nutriensItem);
        if (nutriensCollectionIdentifiers.includes(nutriensIdentifier)) {
          return false;
        }
        nutriensCollectionIdentifiers.push(nutriensIdentifier);
        return true;
      });
      return [...nutriensToAdd, ...nutriensCollection];
    }
    return nutriensCollection;
  }

  protected convertDateFromClient<T extends INutriens | NewNutriens | PartialUpdateNutriens>(nutriens: T): RestOf<T> {
    return {
      ...nutriens,
      createdDate: nutriens.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restNutriens: RestNutriens): INutriens {
    return {
      ...restNutriens,
      createdDate: restNutriens.createdDate ? dayjs(restNutriens.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestNutriens>): HttpResponse<INutriens> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestNutriens[]>): HttpResponse<INutriens[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
