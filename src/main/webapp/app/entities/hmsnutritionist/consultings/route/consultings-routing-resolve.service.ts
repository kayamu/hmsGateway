import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsultings } from '../consultings.model';
import { ConsultingsService } from '../service/consultings.service';

@Injectable({ providedIn: 'root' })
export class ConsultingsRoutingResolveService implements Resolve<IConsultings | null> {
  constructor(protected service: ConsultingsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsultings | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((consultings: HttpResponse<IConsultings>) => {
          if (consultings.body) {
            return of(consultings.body);
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
