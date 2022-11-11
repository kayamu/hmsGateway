import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeliveryOrdersComponent } from '../list/delivery-orders.component';
import { DeliveryOrdersDetailComponent } from '../detail/delivery-orders-detail.component';
import { DeliveryOrdersUpdateComponent } from '../update/delivery-orders-update.component';
import { DeliveryOrdersRoutingResolveService } from './delivery-orders-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const deliveryOrdersRoute: Routes = [
  {
    path: '',
    component: DeliveryOrdersComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryOrdersDetailComponent,
    resolve: {
      deliveryOrders: DeliveryOrdersRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryOrdersUpdateComponent,
    resolve: {
      deliveryOrders: DeliveryOrdersRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryOrdersUpdateComponent,
    resolve: {
      deliveryOrders: DeliveryOrdersRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deliveryOrdersRoute)],
  exports: [RouterModule],
})
export class DeliveryOrdersRoutingModule {}
