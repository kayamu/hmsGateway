import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMenus } from '../menus.model';
import { MenusService } from '../service/menus.service';

@Injectable({ providedIn: 'root' })
export class MenusRoutingResolveService implements Resolve<IMenus | null> {
  constructor(protected service: MenusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMenus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((menus: HttpResponse<IMenus>) => {
          if (menus.body) {
            return of(menus.body);
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
