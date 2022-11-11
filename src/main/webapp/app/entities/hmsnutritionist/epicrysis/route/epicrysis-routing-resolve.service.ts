import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEpicrysis } from '../epicrysis.model';
import { EpicrysisService } from '../service/epicrysis.service';

@Injectable({ providedIn: 'root' })
export class EpicrysisRoutingResolveService implements Resolve<IEpicrysis | null> {
  constructor(protected service: EpicrysisService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEpicrysis | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((epicrysis: HttpResponse<IEpicrysis>) => {
          if (epicrysis.body) {
            return of(epicrysis.body);
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
