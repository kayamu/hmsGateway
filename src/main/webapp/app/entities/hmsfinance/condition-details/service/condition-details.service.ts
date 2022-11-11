import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConditionDetails, NewConditionDetails } from '../condition-details.model';

export type PartialUpdateConditionDetails = Partial<IConditionDetails> & Pick<IConditionDetails, 'id'>;

type RestOf<T extends IConditionDetails | NewConditionDetails> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestConditionDetails = RestOf<IConditionDetails>;

export type NewRestConditionDetails = RestOf<NewConditionDetails>;

export type PartialUpdateRestConditionDetails = RestOf<PartialUpdateConditionDetails>;

export type EntityResponseType = HttpResponse<IConditionDetails>;
export type EntityArrayResponseType = HttpResponse<IConditionDetails[]>;

@Injectable({ providedIn: 'root' })
export class ConditionDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/condition-details', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(conditionDetails: NewConditionDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditionDetails);
    return this.http
      .post<RestConditionDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(conditionDetails: IConditionDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditionDetails);
    return this.http
      .put<RestConditionDetails>(`${this.resourceUrl}/${this.getConditionDetailsIdentifier(conditionDetails)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(conditionDetails: PartialUpdateConditionDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditionDetails);
    return this.http
      .patch<RestConditionDetails>(`${this.resourceUrl}/${this.getConditionDetailsIdentifier(conditionDetails)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestConditionDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestConditionDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConditionDetailsIdentifier(conditionDetails: Pick<IConditionDetails, 'id'>): number {
    return conditionDetails.id;
  }

  compareConditionDetails(o1: Pick<IConditionDetails, 'id'> | null, o2: Pick<IConditionDetails, 'id'> | null): boolean {
    return o1 && o2 ? this.getConditionDetailsIdentifier(o1) === this.getConditionDetailsIdentifier(o2) : o1 === o2;
  }

  addConditionDetailsToCollectionIfMissing<Type extends Pick<IConditionDetails, 'id'>>(
    conditionDetailsCollection: Type[],
    ...conditionDetailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const conditionDetails: Type[] = conditionDetailsToCheck.filter(isPresent);
    if (conditionDetails.length > 0) {
      const conditionDetailsCollectionIdentifiers = conditionDetailsCollection.map(
        conditionDetailsItem => this.getConditionDetailsIdentifier(conditionDetailsItem)!
      );
      const conditionDetailsToAdd = conditionDetails.filter(conditionDetailsItem => {
        const conditionDetailsIdentifier = this.getConditionDetailsIdentifier(conditionDetailsItem);
        if (conditionDetailsCollectionIdentifiers.includes(conditionDetailsIdentifier)) {
          return false;
        }
        conditionDetailsCollectionIdentifiers.push(conditionDetailsIdentifier);
        return true;
      });
      return [...conditionDetailsToAdd, ...conditionDetailsCollection];
    }
    return conditionDetailsCollection;
  }

  protected convertDateFromClient<T extends IConditionDetails | NewConditionDetails | PartialUpdateConditionDetails>(
    conditionDetails: T
  ): RestOf<T> {
    return {
      ...conditionDetails,
      createdDate: conditionDetails.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restConditionDetails: RestConditionDetails): IConditionDetails {
    return {
      ...restConditionDetails,
      createdDate: restConditionDetails.createdDate ? dayjs(restConditionDetails.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestConditionDetails>): HttpResponse<IConditionDetails> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestConditionDetails[]>): HttpResponse<IConditionDetails[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
