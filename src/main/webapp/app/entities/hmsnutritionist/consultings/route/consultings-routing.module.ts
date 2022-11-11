import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConsultingsComponent } from '../list/consultings.component';
import { ConsultingsDetailComponent } from '../detail/consultings-detail.component';
import { ConsultingsUpdateComponent } from '../update/consultings-update.component';
import { ConsultingsRoutingResolveService } from './consultings-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const consultingsRoute: Routes = [
  {
    path: '',
    component: ConsultingsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsultingsDetailComponent,
    resolve: {
      consultings: ConsultingsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsultingsUpdateComponent,
    resolve: {
      consultings: ConsultingsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsultingsUpdateComponent,
    resolve: {
      consultings: ConsultingsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(consultingsRoute)],
  exports: [RouterModule],
})
export class ConsultingsRoutingModule {}
