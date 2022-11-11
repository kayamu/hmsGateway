import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConditionDetails } from '../condition-details.model';
import { ConditionDetailsService } from '../service/condition-details.service';

@Injectable({ providedIn: 'root' })
export class ConditionDetailsRoutingResolveService implements Resolve<IConditionDetails | null> {
  constructor(protected service: ConditionDetailsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConditionDetails | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((conditionDetails: HttpResponse<IConditionDetails>) => {
          if (conditionDetails.body) {
            return of(conditionDetails.body);
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
