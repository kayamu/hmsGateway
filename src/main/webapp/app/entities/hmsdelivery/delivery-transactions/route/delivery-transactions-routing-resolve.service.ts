import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDeliveryTransactions } from '../delivery-transactions.model';
import { DeliveryTransactionsService } from '../service/delivery-transactions.service';

@Injectable({ providedIn: 'root' })
export class DeliveryTransactionsRoutingResolveService implements Resolve<IDeliveryTransactions | null> {
  constructor(protected service: DeliveryTransactionsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliveryTransactions | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((deliveryTransactions: HttpResponse<IDeliveryTransactions>) => {
          if (deliveryTransactions.body) {
            return of(deliveryTransactions.body);
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
