import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CookOrdersComponent } from '../list/cook-orders.component';
import { CookOrdersDetailComponent } from '../detail/cook-orders-detail.component';
import { CookOrdersUpdateComponent } from '../update/cook-orders-update.component';
import { CookOrdersRoutingResolveService } from './cook-orders-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cookOrdersRoute: Routes = [
  {
    path: '',
    component: CookOrdersComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CookOrdersDetailComponent,
    resolve: {
      cookOrders: CookOrdersRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CookOrdersUpdateComponent,
    resolve: {
      cookOrders: CookOrdersRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CookOrdersUpdateComponent,
    resolve: {
      cookOrders: CookOrdersRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cookOrdersRoute)],
  exports: [RouterModule],
})
export class CookOrdersRoutingModule {}
