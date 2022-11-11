import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMenuGroups, NewMenuGroups } from '../menu-groups.model';

export type PartialUpdateMenuGroups = Partial<IMenuGroups> & Pick<IMenuGroups, 'id'>;

type RestOf<T extends IMenuGroups | NewMenuGroups> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestMenuGroups = RestOf<IMenuGroups>;

export type NewRestMenuGroups = RestOf<NewMenuGroups>;

export type PartialUpdateRestMenuGroups = RestOf<PartialUpdateMenuGroups>;

export type EntityResponseType = HttpResponse<IMenuGroups>;
export type EntityArrayResponseType = HttpResponse<IMenuGroups[]>;

@Injectable({ providedIn: 'root' })
export class MenuGroupsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/menu-groups', 'hmsmenu');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(menuGroups: NewMenuGroups): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuGroups);
    return this.http
      .post<RestMenuGroups>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(menuGroups: IMenuGroups): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuGroups);
    return this.http
      .put<RestMenuGroups>(`${this.resourceUrl}/${this.getMenuGroupsIdentifier(menuGroups)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(menuGroups: PartialUpdateMenuGroups): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuGroups);
    return this.http
      .patch<RestMenuGroups>(`${this.resourceUrl}/${this.getMenuGroupsIdentifier(menuGroups)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMenuGroups>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMenuGroups[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMenuGroupsIdentifier(menuGroups: Pick<IMenuGroups, 'id'>): number {
    return menuGroups.id;
  }

  compareMenuGroups(o1: Pick<IMenuGroups, 'id'> | null, o2: Pick<IMenuGroups, 'id'> | null): boolean {
    return o1 && o2 ? this.getMenuGroupsIdentifier(o1) === this.getMenuGroupsIdentifier(o2) : o1 === o2;
  }

  addMenuGroupsToCollectionIfMissing<Type extends Pick<IMenuGroups, 'id'>>(
    menuGroupsCollection: Type[],
    ...menuGroupsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const menuGroups: Type[] = menuGroupsToCheck.filter(isPresent);
    if (menuGroups.length > 0) {
      const menuGroupsCollectionIdentifiers = menuGroupsCollection.map(menuGroupsItem => this.getMenuGroupsIdentifier(menuGroupsItem)!);
      const menuGroupsToAdd = menuGroups.filter(menuGroupsItem => {
        const menuGroupsIdentifier = this.getMenuGroupsIdentifier(menuGroupsItem);
        if (menuGroupsCollectionIdentifiers.includes(menuGroupsIdentifier)) {
          return false;
        }
        menuGroupsCollectionIdentifiers.push(menuGroupsIdentifier);
        return true;
      });
      return [...menuGroupsToAdd, ...menuGroupsCollection];
    }
    return menuGroupsCollection;
  }

  protected convertDateFromClient<T extends IMenuGroups | NewMenuGroups | PartialUpdateMenuGroups>(menuGroups: T): RestOf<T> {
    return {
      ...menuGroups,
      createdDate: menuGroups.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restMenuGroups: RestMenuGroups): IMenuGroups {
    return {
      ...restMenuGroups,
      createdDate: restMenuGroups.createdDate ? dayjs(restMenuGroups.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMenuGroups>): HttpResponse<IMenuGroups> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMenuGroups[]>): HttpResponse<IMenuGroups[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
