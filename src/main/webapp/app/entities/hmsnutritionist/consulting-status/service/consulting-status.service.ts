import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsultingStatus, NewConsultingStatus } from '../consulting-status.model';

export type PartialUpdateConsultingStatus = Partial<IConsultingStatus> & Pick<IConsultingStatus, 'id'>;

export type EntityResponseType = HttpResponse<IConsultingStatus>;
export type EntityArrayResponseType = HttpResponse<IConsultingStatus[]>;

@Injectable({ providedIn: 'root' })
export class ConsultingStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consulting-statuses', 'hmsnutritionist');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(consultingStatus: NewConsultingStatus): Observable<EntityResponseType> {
    return this.http.post<IConsultingStatus>(this.resourceUrl, consultingStatus, { observe: 'response' });
  }

  update(consultingStatus: IConsultingStatus): Observable<EntityResponseType> {
    return this.http.put<IConsultingStatus>(
      `${this.resourceUrl}/${this.getConsultingStatusIdentifier(consultingStatus)}`,
      consultingStatus,
      { observe: 'response' }
    );
  }

  partialUpdate(consultingStatus: PartialUpdateConsultingStatus): Observable<EntityResponseType> {
    return this.http.patch<IConsultingStatus>(
      `${this.resourceUrl}/${this.getConsultingStatusIdentifier(consultingStatus)}`,
      consultingStatus,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsultingStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsultingStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConsultingStatusIdentifier(consultingStatus: Pick<IConsultingStatus, 'id'>): number {
    return consultingStatus.id;
  }

  compareConsultingStatus(o1: Pick<IConsultingStatus, 'id'> | null, o2: Pick<IConsultingStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getConsultingStatusIdentifier(o1) === this.getConsultingStatusIdentifier(o2) : o1 === o2;
  }

  addConsultingStatusToCollectionIfMissing<Type extends Pick<IConsultingStatus, 'id'>>(
    consultingStatusCollection: Type[],
    ...consultingStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const consultingStatuses: Type[] = consultingStatusesToCheck.filter(isPresent);
    if (consultingStatuses.length > 0) {
      const consultingStatusCollectionIdentifiers = consultingStatusCollection.map(
        consultingStatusItem => this.getConsultingStatusIdentifier(consultingStatusItem)!
      );
      const consultingStatusesToAdd = consultingStatuses.filter(consultingStatusItem => {
        const consultingStatusIdentifier = this.getConsultingStatusIdentifier(consultingStatusItem);
        if (consultingStatusCollectionIdentifiers.includes(consultingStatusIdentifier)) {
          return false;
        }
        consultingStatusCollectionIdentifiers.push(consultingStatusIdentifier);
        return true;
      });
      return [...consultingStatusesToAdd, ...consultingStatusCollection];
    }
    return consultingStatusCollection;
  }
}
