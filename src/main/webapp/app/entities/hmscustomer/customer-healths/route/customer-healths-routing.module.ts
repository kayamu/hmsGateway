import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CustomerHealthsComponent } from '../list/customer-healths.component';
import { CustomerHealthsDetailComponent } from '../detail/customer-healths-detail.component';
import { CustomerHealthsUpdateComponent } from '../update/customer-healths-update.component';
import { CustomerHealthsRoutingResolveService } from './customer-healths-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const customerHealthsRoute: Routes = [
  {
    path: '',
    component: CustomerHealthsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerHealthsDetailComponent,
    resolve: {
      customerHealths: CustomerHealthsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerHealthsUpdateComponent,
    resolve: {
      customerHealths: CustomerHealthsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerHealthsUpdateComponent,
    resolve: {
      customerHealths: CustomerHealthsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(customerHealthsRoute)],
  exports: [RouterModule],
})
export class CustomerHealthsRoutingModule {}
