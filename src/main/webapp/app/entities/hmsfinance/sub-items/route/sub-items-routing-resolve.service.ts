import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISubItems } from '../sub-items.model';
import { SubItemsService } from '../service/sub-items.service';

@Injectable({ providedIn: 'root' })
export class SubItemsRoutingResolveService implements Resolve<ISubItems | null> {
  constructor(protected service: SubItemsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubItems | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((subItems: HttpResponse<ISubItems>) => {
          if (subItems.body) {
            return of(subItems.body);
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
