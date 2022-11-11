import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITemplates } from '../templates.model';
import { TemplatesService } from '../service/templates.service';

@Injectable({ providedIn: 'root' })
export class TemplatesRoutingResolveService implements Resolve<ITemplates | null> {
  constructor(protected service: TemplatesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITemplates | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((templates: HttpResponse<ITemplates>) => {
          if (templates.body) {
            return of(templates.body);
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
