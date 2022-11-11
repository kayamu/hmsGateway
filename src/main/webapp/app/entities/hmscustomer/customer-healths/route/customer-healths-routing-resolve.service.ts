import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICustomerHealths } from '../customer-healths.model';
import { CustomerHealthsService } from '../service/customer-healths.service';

@Injectable({ providedIn: 'root' })
export class CustomerHealthsRoutingResolveService implements Resolve<ICustomerHealths | null> {
  constructor(protected service: CustomerHealthsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerHealths | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((customerHealths: HttpResponse<ICustomerHealths>) => {
          if (customerHealths.body) {
            return of(customerHealths.body);
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
