import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CookTransactionsComponent } from '../list/cook-transactions.component';
import { CookTransactionsDetailComponent } from '../detail/cook-transactions-detail.component';
import { CookTransactionsUpdateComponent } from '../update/cook-transactions-update.component';
import { CookTransactionsRoutingResolveService } from './cook-transactions-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cookTransactionsRoute: Routes = [
  {
    path: '',
    component: CookTransactionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CookTransactionsDetailComponent,
    resolve: {
      cookTransactions: CookTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CookTransactionsUpdateComponent,
    resolve: {
      cookTransactions: CookTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CookTransactionsUpdateComponent,
    resolve: {
      cookTransactions: CookTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cookTransactionsRoute)],
  exports: [RouterModule],
})
export class CookTransactionsRoutingModule {}
