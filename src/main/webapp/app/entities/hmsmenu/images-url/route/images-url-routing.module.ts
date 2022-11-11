import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ImagesUrlComponent } from '../list/images-url.component';
import { ImagesUrlDetailComponent } from '../detail/images-url-detail.component';
import { ImagesUrlUpdateComponent } from '../update/images-url-update.component';
import { ImagesUrlRoutingResolveService } from './images-url-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const imagesUrlRoute: Routes = [
  {
    path: '',
    component: ImagesUrlComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ImagesUrlDetailComponent,
    resolve: {
      imagesUrl: ImagesUrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ImagesUrlUpdateComponent,
    resolve: {
      imagesUrl: ImagesUrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ImagesUrlUpdateComponent,
    resolve: {
      imagesUrl: ImagesUrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(imagesUrlRoute)],
  exports: [RouterModule],
})
export class ImagesUrlRoutingModule {}
