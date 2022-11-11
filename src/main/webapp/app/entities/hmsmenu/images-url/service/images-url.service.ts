import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IImagesUrl, NewImagesUrl } from '../images-url.model';

export type PartialUpdateImagesUrl = Partial<IImagesUrl> & Pick<IImagesUrl, 'id'>;

type RestOf<T extends IImagesUrl | NewImagesUrl> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestImagesUrl = RestOf<IImagesUrl>;

export type NewRestImagesUrl = RestOf<NewImagesUrl>;

export type PartialUpdateRestImagesUrl = RestOf<PartialUpdateImagesUrl>;

export type EntityResponseType = HttpResponse<IImagesUrl>;
export type EntityArrayResponseType = HttpResponse<IImagesUrl[]>;

@Injectable({ providedIn: 'root' })
export class ImagesUrlService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/images-urls', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(imagesUrl: NewImagesUrl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imagesUrl);
    return this.http
      .post<RestImagesUrl>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(imagesUrl: IImagesUrl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imagesUrl);
    return this.http
      .put<RestImagesUrl>(`${this.resourceUrl}/${this.getImagesUrlIdentifier(imagesUrl)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(imagesUrl: PartialUpdateImagesUrl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imagesUrl);
    return this.http
      .patch<RestImagesUrl>(`${this.resourceUrl}/${this.getImagesUrlIdentifier(imagesUrl)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestImagesUrl>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestImagesUrl[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getImagesUrlIdentifier(imagesUrl: Pick<IImagesUrl, 'id'>): number {
    return imagesUrl.id;
  }

  compareImagesUrl(o1: Pick<IImagesUrl, 'id'> | null, o2: Pick<IImagesUrl, 'id'> | null): boolean {
    return o1 && o2 ? this.getImagesUrlIdentifier(o1) === this.getImagesUrlIdentifier(o2) : o1 === o2;
  }

  addImagesUrlToCollectionIfMissing<Type extends Pick<IImagesUrl, 'id'>>(
    imagesUrlCollection: Type[],
    ...imagesUrlsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const imagesUrls: Type[] = imagesUrlsToCheck.filter(isPresent);
    if (imagesUrls.length > 0) {
      const imagesUrlCollectionIdentifiers = imagesUrlCollection.map(imagesUrlItem => this.getImagesUrlIdentifier(imagesUrlItem)!);
      const imagesUrlsToAdd = imagesUrls.filter(imagesUrlItem => {
        const imagesUrlIdentifier = this.getImagesUrlIdentifier(imagesUrlItem);
        if (imagesUrlCollectionIdentifiers.includes(imagesUrlIdentifier)) {
          return false;
        }
        imagesUrlCollectionIdentifiers.push(imagesUrlIdentifier);
        return true;
      });
      return [...imagesUrlsToAdd, ...imagesUrlCollection];
    }
    return imagesUrlCollection;
  }

  protected convertDateFromClient<T extends IImagesUrl | NewImagesUrl | PartialUpdateImagesUrl>(imagesUrl: T): RestOf<T> {
    return {
      ...imagesUrl,
      createdDate: imagesUrl.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restImagesUrl: RestImagesUrl): IImagesUrl {
    return {
      ...restImagesUrl,
      createdDate: restImagesUrl.createdDate ? dayjs(restImagesUrl.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestImagesUrl>): HttpResponse<IImagesUrl> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestImagesUrl[]>): HttpResponse<IImagesUrl[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
