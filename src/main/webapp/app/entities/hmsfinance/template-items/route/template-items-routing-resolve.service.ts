import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITemplateItems } from '../template-items.model';
import { TemplateItemsService } from '../service/template-items.service';

@Injectable({ providedIn: 'root' })
export class TemplateItemsRoutingResolveService implements Resolve<ITemplateItems | null> {
  constructor(protected service: TemplateItemsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITemplateItems | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((templateItems: HttpResponse<ITemplateItems>) => {
          if (templateItems.body) {
            return of(templateItems.body);
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
