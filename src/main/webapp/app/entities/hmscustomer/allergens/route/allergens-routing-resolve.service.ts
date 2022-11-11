import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAllergens } from '../allergens.model';
import { AllergensService } from '../service/allergens.service';

@Injectable({ providedIn: 'root' })
export class AllergensRoutingResolveService implements Resolve<IAllergens | null> {
  constructor(protected service: AllergensService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAllergens | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((allergens: HttpResponse<IAllergens>) => {
          if (allergens.body) {
            return of(allergens.body);
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
