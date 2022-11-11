import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConditions, NewConditions } from '../conditions.model';

export type PartialUpdateConditions = Partial<IConditions> & Pick<IConditions, 'id'>;

type RestOf<T extends IConditions | NewConditions> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestConditions = RestOf<IConditions>;

export type NewRestConditions = RestOf<NewConditions>;

export type PartialUpdateRestConditions = RestOf<PartialUpdateConditions>;

export type EntityResponseType = HttpResponse<IConditions>;
export type EntityArrayResponseType = HttpResponse<IConditions[]>;

@Injectable({ providedIn: 'root' })
export class ConditionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/conditions', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(conditions: NewConditions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditions);
    return this.http
      .post<RestConditions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(conditions: IConditions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditions);
    return this.http
      .put<RestConditions>(`${this.resourceUrl}/${this.getConditionsIdentifier(conditions)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(conditions: PartialUpdateConditions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditions);
    return this.http
      .patch<RestConditions>(`${this.resourceUrl}/${this.getConditionsIdentifier(conditions)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestConditions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestConditions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConditionsIdentifier(conditions: Pick<IConditions, 'id'>): number {
    return conditions.id;
  }

  compareConditions(o1: Pick<IConditions, 'id'> | null, o2: Pick<IConditions, 'id'> | null): boolean {
    return o1 && o2 ? this.getConditionsIdentifier(o1) === this.getConditionsIdentifier(o2) : o1 === o2;
  }

  addConditionsToCollectionIfMissing<Type extends Pick<IConditions, 'id'>>(
    conditionsCollection: Type[],
    ...conditionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const conditions: Type[] = conditionsToCheck.filter(isPresent);
    if (conditions.length > 0) {
      const conditionsCollectionIdentifiers = conditionsCollection.map(conditionsItem => this.getConditionsIdentifier(conditionsItem)!);
      const conditionsToAdd = conditions.filter(conditionsItem => {
        const conditionsIdentifier = this.getConditionsIdentifier(conditionsItem);
        if (conditionsCollectionIdentifiers.includes(conditionsIdentifier)) {
          return false;
        }
        conditionsCollectionIdentifiers.push(conditionsIdentifier);
        return true;
      });
      return [...conditionsToAdd, ...conditionsCollection];
    }
    return conditionsCollection;
  }

  protected convertDateFromClient<T extends IConditions | NewConditions | PartialUpdateConditions>(conditions: T): RestOf<T> {
    return {
      ...conditions,
      createdDate: conditions.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restConditions: RestConditions): IConditions {
    return {
      ...restConditions,
      createdDate: restConditions.createdDate ? dayjs(restConditions.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestConditions>): HttpResponse<IConditions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestConditions[]>): HttpResponse<IConditions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
