import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRecipies } from '../recipies.model';
import { RecipiesService } from '../service/recipies.service';

@Injectable({ providedIn: 'root' })
export class RecipiesRoutingResolveService implements Resolve<IRecipies | null> {
  constructor(protected service: RecipiesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecipies | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((recipies: HttpResponse<IRecipies>) => {
          if (recipies.body) {
            return of(recipies.body);
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
