import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICookTransactions, NewCookTransactions } from '../cook-transactions.model';

export type PartialUpdateCookTransactions = Partial<ICookTransactions> & Pick<ICookTransactions, 'id'>;

type RestOf<T extends ICookTransactions | NewCookTransactions> = Omit<T, 'statusChangedDate' | 'transactionDate' | 'createdDate'> & {
  statusChangedDate?: string | null;
  transactionDate?: string | null;
  createdDate?: string | null;
};

export type RestCookTransactions = RestOf<ICookTransactions>;

export type NewRestCookTransactions = RestOf<NewCookTransactions>;

export type PartialUpdateRestCookTransactions = RestOf<PartialUpdateCookTransactions>;

export type EntityResponseType = HttpResponse<ICookTransactions>;
export type EntityArrayResponseType = HttpResponse<ICookTransactions[]>;

@Injectable({ providedIn: 'root' })
export class CookTransactionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cook-transactions', 'hmskitchen');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cookTransactions: NewCookTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cookTransactions);
    return this.http
      .post<RestCookTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cookTransactions: ICookTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cookTransactions);
    return this.http
      .put<RestCookTransactions>(`${this.resourceUrl}/${this.getCookTransactionsIdentifier(cookTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cookTransactions: PartialUpdateCookTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cookTransactions);
    return this.http
      .patch<RestCookTransactions>(`${this.resourceUrl}/${this.getCookTransactionsIdentifier(cookTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCookTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCookTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCookTransactionsIdentifier(cookTransactions: Pick<ICookTransactions, 'id'>): number {
    return cookTransactions.id;
  }

  compareCookTransactions(o1: Pick<ICookTransactions, 'id'> | null, o2: Pick<ICookTransactions, 'id'> | null): boolean {
    return o1 && o2 ? this.getCookTransactionsIdentifier(o1) === this.getCookTransactionsIdentifier(o2) : o1 === o2;
  }

  addCookTransactionsToCollectionIfMissing<Type extends Pick<ICookTransactions, 'id'>>(
    cookTransactionsCollection: Type[],
    ...cookTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cookTransactions: Type[] = cookTransactionsToCheck.filter(isPresent);
    if (cookTransactions.length > 0) {
      const cookTransactionsCollectionIdentifiers = cookTransactionsCollection.map(
        cookTransactionsItem => this.getCookTransactionsIdentifier(cookTransactionsItem)!
      );
      const cookTransactionsToAdd = cookTransactions.filter(cookTransactionsItem => {
        const cookTransactionsIdentifier = this.getCookTransactionsIdentifier(cookTransactionsItem);
        if (cookTransactionsCollectionIdentifiers.includes(cookTransactionsIdentifier)) {
          return false;
        }
        cookTransactionsCollectionIdentifiers.push(cookTransactionsIdentifier);
        return true;
      });
      return [...cookTransactionsToAdd, ...cookTransactionsCollection];
    }
    return cookTransactionsCollection;
  }

  protected convertDateFromClient<T extends ICookTransactions | NewCookTransactions | PartialUpdateCookTransactions>(
    cookTransactions: T
  ): RestOf<T> {
    return {
      ...cookTransactions,
      statusChangedDate: cookTransactions.statusChangedDate?.format(DATE_FORMAT) ?? null,
      transactionDate: cookTransactions.transactionDate?.format(DATE_FORMAT) ?? null,
      createdDate: cookTransactions.createdDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCookTransactions: RestCookTransactions): ICookTransactions {
    return {
      ...restCookTransactions,
      statusChangedDate: restCookTransactions.statusChangedDate ? dayjs(restCookTransactions.statusChangedDate) : undefined,
      transactionDate: restCookTransactions.transactionDate ? dayjs(restCookTransactions.transactionDate) : undefined,
      createdDate: restCookTransactions.createdDate ? dayjs(restCookTransactions.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCookTransactions>): HttpResponse<ICookTransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCookTransactions[]>): HttpResponse<ICookTransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
