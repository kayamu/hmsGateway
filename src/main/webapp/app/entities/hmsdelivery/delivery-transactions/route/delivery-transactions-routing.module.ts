import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeliveryTransactionsComponent } from '../list/delivery-transactions.component';
import { DeliveryTransactionsDetailComponent } from '../detail/delivery-transactions-detail.component';
import { DeliveryTransactionsUpdateComponent } from '../update/delivery-transactions-update.component';
import { DeliveryTransactionsRoutingResolveService } from './delivery-transactions-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const deliveryTransactionsRoute: Routes = [
  {
    path: '',
    component: DeliveryTransactionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryTransactionsDetailComponent,
    resolve: {
      deliveryTransactions: DeliveryTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryTransactionsUpdateComponent,
    resolve: {
      deliveryTransactions: DeliveryTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryTransactionsUpdateComponent,
    resolve: {
      deliveryTransactions: DeliveryTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deliveryTransactionsRoute)],
  exports: [RouterModule],
})
export class DeliveryTransactionsRoutingModule {}
