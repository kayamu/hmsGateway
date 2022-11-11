import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICookTransactions } from '../cook-transactions.model';
import { CookTransactionsService } from '../service/cook-transactions.service';

@Injectable({ providedIn: 'root' })
export class CookTransactionsRoutingResolveService implements Resolve<ICookTransactions | null> {
  constructor(protected service: CookTransactionsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICookTransactions | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cookTransactions: HttpResponse<ICookTransactions>) => {
          if (cookTransactions.body) {
            return of(cookTransactions.body);
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
