import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITemplates, NewTemplates } from '../templates.model';

export type PartialUpdateTemplates = Partial<ITemplates> & Pick<ITemplates, 'id'>;

type RestOf<T extends ITemplates | NewTemplates> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestTemplates = RestOf<ITemplates>;

export type NewRestTemplates = RestOf<NewTemplates>;

export type PartialUpdateRestTemplates = RestOf<PartialUpdateTemplates>;

export type EntityResponseType = HttpResponse<ITemplates>;
export type EntityArrayResponseType = HttpResponse<ITemplates[]>;

@Injectable({ providedIn: 'root' })
export class TemplatesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/templates', 'hmsfinance');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(templates: NewTemplates): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(templates);
    return this.http
      .post<RestTemplates>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(templates: ITemplates): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(templates);
    return this.http
      .put<RestTemplates>(`${this.resourceUrl}/${this.getTemplatesIdentifier(templates)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(templates: PartialUpdateTemplates): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(templates);
    return this.http
      .patch<RestTemplates>(`${this.resourceUrl}/${this.getTemplatesIdentifier(templates)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTemplates>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTemplates[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTemplatesIdentifier(templates: Pick<ITemplates, 'id'>): number {
    return templates.id;
  }

  compareTemplates(o1: Pick<ITemplates, 'id'> | null, o2: Pick<ITemplates, 'id'> | null): boolean {
    return o1 && o2 ? this.getTemplatesIdentifier(o1) === this.getTemplatesIdentifier(o2) : o1 === o2;
  }

  addTemplatesToCollectionIfMissing<Type extends Pick<ITemplates, 'id'>>(
    templatesCollection: Type[],
    ...templatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const templates: Type[] = templatesToCheck.filter(isPresent);
    if (templates.length > 0) {
      const templatesCollectionIdentifiers = templatesCollection.map(templatesItem => this.getTemplatesIdentifier(templatesItem)!);
      const templatesToAdd = templates.filter(templatesItem => {
        const templatesIdentifier = this.getTemplatesIdentifier(templatesItem);
        if (templatesCollectionIdentifiers.includes(templatesIdentifier)) {
          return false;
        }
        templatesCollectionIdentifiers.push(templatesIdentifier);
        return true;
      });
      return [...templatesToAdd, ...templatesCollection];
    }
    return templatesCollection;
  }

  protected convertDateFromClient<T extends ITemplates | NewTemplates | PartialUpdateTemplates>(templates: T): RestOf<T> {
    return {
      ...templates,
      createdDate: templates.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTemplates: RestTemplates): ITemplates {
    return {
      ...restTemplates,
      createdDate: restTemplates.createdDate ? dayjs(restTemplates.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTemplates>): HttpResponse<ITemplates> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTemplates[]>): HttpResponse<ITemplates[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
