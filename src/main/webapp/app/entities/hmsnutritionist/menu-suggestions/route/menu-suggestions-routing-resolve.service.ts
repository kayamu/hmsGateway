import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMenuSuggestions } from '../menu-suggestions.model';
import { MenuSuggestionsService } from '../service/menu-suggestions.service';

@Injectable({ providedIn: 'root' })
export class MenuSuggestionsRoutingResolveService implements Resolve<IMenuSuggestions | null> {
  constructor(protected service: MenuSuggestionsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMenuSuggestions | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((menuSuggestions: HttpResponse<IMenuSuggestions>) => {
          if (menuSuggestions.body) {
            return of(menuSuggestions.body);
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
