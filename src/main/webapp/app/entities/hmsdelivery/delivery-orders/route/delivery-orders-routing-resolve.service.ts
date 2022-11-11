import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDeliveryOrders } from '../delivery-orders.model';
import { DeliveryOrdersService } from '../service/delivery-orders.service';

@Injectable({ providedIn: 'root' })
export class DeliveryOrdersRoutingResolveService implements Resolve<IDeliveryOrders | null> {
  constructor(protected service: DeliveryOrdersService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliveryOrders | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((deliveryOrders: HttpResponse<IDeliveryOrders>) => {
          if (deliveryOrders.body) {
            return of(deliveryOrders.body);
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
