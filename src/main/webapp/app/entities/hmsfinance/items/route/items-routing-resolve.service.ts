import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItems } from '../items.model';
import { ItemsService } from '../service/items.service';

@Injectable({ providedIn: 'root' })
export class ItemsRoutingResolveService implements Resolve<IItems | null> {
  constructor(protected service: ItemsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItems | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((items: HttpResponse<IItems>) => {
          if (items.body) {
            return of(items.body);
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
