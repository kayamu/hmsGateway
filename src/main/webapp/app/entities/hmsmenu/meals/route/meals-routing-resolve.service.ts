import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMeals } from '../meals.model';
import { MealsService } from '../service/meals.service';

@Injectable({ providedIn: 'root' })
export class MealsRoutingResolveService implements Resolve<IMeals | null> {
  constructor(protected service: MealsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMeals | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((meals: HttpResponse<IMeals>) => {
          if (meals.body) {
            return of(meals.body);
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
