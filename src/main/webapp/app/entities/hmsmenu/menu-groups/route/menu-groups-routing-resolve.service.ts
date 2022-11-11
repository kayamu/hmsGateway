import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMenuGroups } from '../menu-groups.model';
import { MenuGroupsService } from '../service/menu-groups.service';

@Injectable({ providedIn: 'root' })
export class MenuGroupsRoutingResolveService implements Resolve<IMenuGroups | null> {
  constructor(protected service: MenuGroupsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMenuGroups | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((menuGroups: HttpResponse<IMenuGroups>) => {
          if (menuGroups.body) {
            return of(menuGroups.body);
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
