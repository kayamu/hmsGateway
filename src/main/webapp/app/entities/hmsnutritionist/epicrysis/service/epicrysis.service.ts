import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEpicrysis, NewEpicrysis } from '../epicrysis.model';

export type PartialUpdateEpicrysis = Partial<IEpicrysis> & Pick<IEpicrysis, 'id'>;

type RestOf<T extends IEpicrysis | NewEpicrysis> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestEpicrysis = RestOf<IEpicrysis>;

export type NewRestEpicrysis = RestOf<NewEpicrysis>;

export type PartialUpdateRestEpicrysis = RestOf<PartialUpdateEpicrysis>;

export type EntityResponseType = HttpResponse<IEpicrysis>;
export type EntityArrayResponseType = HttpResponse<IEpicrysis[]>;

@Injectable({ providedIn: 'root' })
export class EpicrysisService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/epicryses', 'hmsnutritionist');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(epicrysis: NewEpicrysis): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(epicrysis);
    return this.http
      .post<RestEpicrysis>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(epicrysis: IEpicrysis): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(epicrysis);
    return this.http
      .put<RestEpicrysis>(`${this.resourceUrl}/${this.getEpicrysisIdentifier(epicrysis)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(epicrysis: PartialUpdateEpicrysis): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(epicrysis);
    return this.http
      .patch<RestEpicrysis>(`${this.resourceUrl}/${this.getEpicrysisIdentifier(epicrysis)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEpicrysis>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEpicrysis[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEpicrysisIdentifier(epicrysis: Pick<IEpicrysis, 'id'>): number {
    return epicrysis.id;
  }

  compareEpicrysis(o1: Pick<IEpicrysis, 'id'> | null, o2: Pick<IEpicrysis, 'id'> | null): boolean {
    return o1 && o2 ? this.getEpicrysisIdentifier(o1) === this.getEpicrysisIdentifier(o2) : o1 === o2;
  }

  addEpicrysisToCollectionIfMissing<Type extends Pick<IEpicrysis, 'id'>>(
    epicrysisCollection: Type[],
    ...epicrysesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const epicryses: Type[] = epicrysesToCheck.filter(isPresent);
    if (epicryses.length > 0) {
      const epicrysisCollectionIdentifiers = epicrysisCollection.map(epicrysisItem => this.getEpicrysisIdentifier(epicrysisItem)!);
      const epicrysesToAdd = epicryses.filter(epicrysisItem => {
        const epicrysisIdentifier = this.getEpicrysisIdentifier(epicrysisItem);
        if (epicrysisCollectionIdentifiers.includes(epicrysisIdentifier)) {
          return false;
        }
        epicrysisCollectionIdentifiers.push(epicrysisIdentifier);
        return true;
      });
      return [...epicrysesToAdd, ...epicrysisCollection];
    }
    return epicrysisCollection;
  }

  protected convertDateFromClient<T extends IEpicrysis | NewEpicrysis | PartialUpdateEpicrysis>(epicrysis: T): RestOf<T> {
    return {
      ...epicrysis,
      createdDate: epicrysis.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restEpicrysis: RestEpicrysis): IEpicrysis {
    return {
      ...restEpicrysis,
      createdDate: restEpicrysis.createdDate ? dayjs(restEpicrysis.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEpicrysis>): HttpResponse<IEpicrysis> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEpicrysis[]>): HttpResponse<IEpicrysis[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
