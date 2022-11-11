import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInvoiceTransactions } from '../invoice-transactions.model';
import { InvoiceTransactionsService } from '../service/invoice-transactions.service';

@Injectable({ providedIn: 'root' })
export class InvoiceTransactionsRoutingResolveService implements Resolve<IInvoiceTransactions | null> {
  constructor(protected service: InvoiceTransactionsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvoiceTransactions | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((invoiceTransactions: HttpResponse<IInvoiceTransactions>) => {
          if (invoiceTransactions.body) {
            return of(invoiceTransactions.body);
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
