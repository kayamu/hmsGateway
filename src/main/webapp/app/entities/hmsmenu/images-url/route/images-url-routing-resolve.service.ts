import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IImagesUrl } from '../images-url.model';
import { ImagesUrlService } from '../service/images-url.service';

@Injectable({ providedIn: 'root' })
export class ImagesUrlRoutingResolveService implements Resolve<IImagesUrl | null> {
  constructor(protected service: ImagesUrlService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImagesUrl | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((imagesUrl: HttpResponse<IImagesUrl>) => {
          if (imagesUrl.body) {
            return of(imagesUrl.body);
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
