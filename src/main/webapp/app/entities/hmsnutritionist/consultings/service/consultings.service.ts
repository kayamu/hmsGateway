import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsultings, NewConsultings } from '../consultings.model';

export type PartialUpdateConsultings = Partial<IConsultings> & Pick<IConsultings, 'id'>;

type RestOf<T extends IConsultings | NewConsultings> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestConsultings = RestOf<IConsultings>;

export type NewRestConsultings = RestOf<NewConsultings>;

export type PartialUpdateRestConsultings = RestOf<PartialUpdateConsultings>;

export type EntityResponseType = HttpResponse<IConsultings>;
export type EntityArrayResponseType = HttpResponse<IConsultings[]>;

@Injectable({ providedIn: 'root' })
export class ConsultingsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consultings', 'hmsnutritionist');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(consultings: NewConsultings): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consultings);
    return this.http
      .post<RestConsultings>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(consultings: IConsultings): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consultings);
    return this.http
      .put<RestConsultings>(`${this.resourceUrl}/${this.getConsultingsIdentifier(consultings)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(consultings: PartialUpdateConsultings): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consultings);
    return this.http
      .patch<RestConsultings>(`${this.resourceUrl}/${this.getConsultingsIdentifier(consultings)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestConsultings>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestConsultings[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConsultingsIdentifier(consultings: Pick<IConsultings, 'id'>): number {
    return consultings.id;
  }

  compareConsultings(o1: Pick<IConsultings, 'id'> | null, o2: Pick<IConsultings, 'id'> | null): boolean {
    return o1 && o2 ? this.getConsultingsIdentifier(o1) === this.getConsultingsIdentifier(o2) : o1 === o2;
  }

  addConsultingsToCollectionIfMissing<Type extends Pick<IConsultings, 'id'>>(
    consultingsCollection: Type[],
    ...consultingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const consultings: Type[] = consultingsToCheck.filter(isPresent);
    if (consultings.length > 0) {
      const consultingsCollectionIdentifiers = consultingsCollection.map(
        consultingsItem => this.getConsultingsIdentifier(consultingsItem)!
      );
      const consultingsToAdd = consultings.filter(consultingsItem => {
        const consultingsIdentifier = this.getConsultingsIdentifier(consultingsItem);
        if (consultingsCollectionIdentifiers.includes(consultingsIdentifier)) {
          return false;
        }
        consultingsCollectionIdentifiers.push(consultingsIdentifier);
        return true;
      });
      return [...consultingsToAdd, ...consultingsCollection];
    }
    return consultingsCollection;
  }

  protected convertDateFromClient<T extends IConsultings | NewConsultings | PartialUpdateConsultings>(consultings: T): RestOf<T> {
    return {
      ...consultings,
      createdDate: consultings.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restConsultings: RestConsultings): IConsultings {
    return {
      ...restConsultings,
      createdDate: restConsultings.createdDate ? dayjs(restConsultings.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestConsultings>): HttpResponse<IConsultings> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestConsultings[]>): HttpResponse<IConsultings[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
