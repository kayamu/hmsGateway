import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIngredients } from '../ingredients.model';
import { IngredientsService } from '../service/ingredients.service';

@Injectable({ providedIn: 'root' })
export class IngredientsRoutingResolveService implements Resolve<IIngredients | null> {
  constructor(protected service: IngredientsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIngredients | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ingredients: HttpResponse<IIngredients>) => {
          if (ingredients.body) {
            return of(ingredients.body);
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
