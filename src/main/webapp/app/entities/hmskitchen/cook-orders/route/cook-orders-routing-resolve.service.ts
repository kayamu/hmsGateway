import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICookOrders } from '../cook-orders.model';
import { CookOrdersService } from '../service/cook-orders.service';

@Injectable({ providedIn: 'root' })
export class CookOrdersRoutingResolveService implements Resolve<ICookOrders | null> {
  constructor(protected service: CookOrdersService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICookOrders | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cookOrders: HttpResponse<ICookOrders>) => {
          if (cookOrders.body) {
            return of(cookOrders.body);
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
