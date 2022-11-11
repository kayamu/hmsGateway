import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInvoices } from '../invoices.model';
import { InvoicesService } from '../service/invoices.service';

@Injectable({ providedIn: 'root' })
export class InvoicesRoutingResolveService implements Resolve<IInvoices | null> {
  constructor(protected service: InvoicesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvoices | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((invoices: HttpResponse<IInvoices>) => {
          if (invoices.body) {
            return of(invoices.body);
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
