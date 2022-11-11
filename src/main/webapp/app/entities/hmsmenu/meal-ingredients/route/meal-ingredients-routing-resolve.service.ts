import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMealIngredients } from '../meal-ingredients.model';
import { MealIngredientsService } from '../service/meal-ingredients.service';

@Injectable({ providedIn: 'root' })
export class MealIngredientsRoutingResolveService implements Resolve<IMealIngredients | null> {
  constructor(protected service: MealIngredientsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMealIngredients | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((mealIngredients: HttpResponse<IMealIngredients>) => {
          if (mealIngredients.body) {
            return of(mealIngredients.body);
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
