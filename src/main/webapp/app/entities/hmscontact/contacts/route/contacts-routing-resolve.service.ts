import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContacts } from '../contacts.model';
import { ContactsService } from '../service/contacts.service';

@Injectable({ providedIn: 'root' })
export class ContactsRoutingResolveService implements Resolve<IContacts | null> {
  constructor(protected service: ContactsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContacts | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contacts: HttpResponse<IContacts>) => {
          if (contacts.body) {
            return of(contacts.body);
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
