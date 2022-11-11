import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INutriens } from '../nutriens.model';
import { NutriensService } from '../service/nutriens.service';

@Injectable({ providedIn: 'root' })
export class NutriensRoutingResolveService implements Resolve<INutriens | null> {
  constructor(protected service: NutriensService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INutriens | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nutriens: HttpResponse<INutriens>) => {
          if (nutriens.body) {
            return of(nutriens.body);
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
