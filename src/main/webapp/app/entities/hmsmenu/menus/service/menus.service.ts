import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMenus, NewMenus } from '../menus.model';

export type PartialUpdateMenus = Partial<IMenus> & Pick<IMenus, 'id'>;

type RestOf<T extends IMenus | NewMenus> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestMenus = RestOf<IMenus>;

export type NewRestMenus = RestOf<NewMenus>;

export type PartialUpdateRestMenus = RestOf<PartialUpdateMenus>;

export type EntityResponseType = HttpResponse<IMenus>;
export type EntityArrayResponseType = HttpResponse<IMenus[]>;

@Injectable({ providedIn: 'root' })
export class MenusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/menus', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(menus: NewMenus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menus);
    return this.http.post<RestMenus>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(menus: IMenus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menus);
    return this.http
      .put<RestMenus>(`${this.resourceUrl}/${this.getMenusIdentifier(menus)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(menus: PartialUpdateMenus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menus);
    return this.http
      .patch<RestMenus>(`${this.resourceUrl}/${this.getMenusIdentifier(menus)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMenus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMenus[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMenusIdentifier(menus: Pick<IMenus, 'id'>): number {
    return menus.id;
  }

  compareMenus(o1: Pick<IMenus, 'id'> | null, o2: Pick<IMenus, 'id'> | null): boolean {
    return o1 && o2 ? this.getMenusIdentifier(o1) === this.getMenusIdentifier(o2) : o1 === o2;
  }

  addMenusToCollectionIfMissing<Type extends Pick<IMenus, 'id'>>(
    menusCollection: Type[],
    ...menusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const menus: Type[] = menusToCheck.filter(isPresent);
    if (menus.length > 0) {
      const menusCollectionIdentifiers = menusCollection.map(menusItem => this.getMenusIdentifier(menusItem)!);
      const menusToAdd = menus.filter(menusItem => {
        const menusIdentifier = this.getMenusIdentifier(menusItem);
        if (menusCollectionIdentifiers.includes(menusIdentifier)) {
          return false;
        }
        menusCollectionIdentifiers.push(menusIdentifier);
        return true;
      });
      return [...menusToAdd, ...menusCollection];
    }
    return menusCollection;
  }

  protected convertDateFromClient<T extends IMenus | NewMenus | PartialUpdateMenus>(menus: T): RestOf<T> {
    return {
      ...menus,
      createdDate: menus.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restMenus: RestMenus): IMenus {
    return {
      ...restMenus,
      createdDate: restMenus.createdDate ? dayjs(restMenus.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMenus>): HttpResponse<IMenus> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMenus[]>): HttpResponse<IMenus[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
