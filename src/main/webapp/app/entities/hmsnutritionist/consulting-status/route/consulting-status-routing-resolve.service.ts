import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsultingStatus } from '../consulting-status.model';
import { ConsultingStatusService } from '../service/consulting-status.service';

@Injectable({ providedIn: 'root' })
export class ConsultingStatusRoutingResolveService implements Resolve<IConsultingStatus | null> {
  constructor(protected service: ConsultingStatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsultingStatus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((consultingStatus: HttpResponse<IConsultingStatus>) => {
          if (consultingStatus.body) {
            return of(consultingStatus.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
