import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConditions } from '../conditions.model';
import { ConditionsService } from '../service/conditions.service';

@Injectable({ providedIn: 'root' })
export class ConditionsRoutingResolveService implements Resolve<IConditions | null> {
  constructor(protected service: ConditionsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConditions | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((conditions: HttpResponse<IConditions>) => {
          if (conditions.body) {
            return of(conditions.body);
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
