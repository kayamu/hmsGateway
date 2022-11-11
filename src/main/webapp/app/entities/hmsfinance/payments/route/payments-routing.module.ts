import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PaymentsComponent } from '../list/payments.component';
import { PaymentsDetailComponent } from '../detail/payments-detail.component';
import { PaymentsUpdateComponent } from '../update/payments-update.component';
import { PaymentsRoutingResolveService } from './payments-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const paymentsRoute: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaymentsDetailComponent,
    resolve: {
      payments: PaymentsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaymentsUpdateComponent,
    resolve: {
      payments: PaymentsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaymentsUpdateComponent,
    resolve: {
      payments: PaymentsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(paymentsRoute)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
