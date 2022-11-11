import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInvoiceDetails } from '../invoice-details.model';
import { InvoiceDetailsService } from '../service/invoice-details.service';

@Injectable({ providedIn: 'root' })
export class InvoiceDetailsRoutingResolveService implements Resolve<IInvoiceDetails | null> {
  constructor(protected service: InvoiceDetailsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvoiceDetails | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((invoiceDetails: HttpResponse<IInvoiceDetails>) => {
          if (invoiceDetails.body) {
            return of(invoiceDetails.body);
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
