import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContactAddresses } from '../contact-addresses.model';
import { ContactAddressesService } from '../service/contact-addresses.service';

@Injectable({ providedIn: 'root' })
export class ContactAddressesRoutingResolveService implements Resolve<IContactAddresses | null> {
  constructor(protected service: ContactAddressesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContactAddresses | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contactAddresses: HttpResponse<IContactAddresses>) => {
          if (contactAddresses.body) {
            return of(contactAddresses.body);
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
