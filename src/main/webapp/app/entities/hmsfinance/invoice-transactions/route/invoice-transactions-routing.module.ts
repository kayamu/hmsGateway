import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InvoiceTransactionsComponent } from '../list/invoice-transactions.component';
import { InvoiceTransactionsDetailComponent } from '../detail/invoice-transactions-detail.component';
import { InvoiceTransactionsUpdateComponent } from '../update/invoice-transactions-update.component';
import { InvoiceTransactionsRoutingResolveService } from './invoice-transactions-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const invoiceTransactionsRoute: Routes = [
  {
    path: '',
    component: InvoiceTransactionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InvoiceTransactionsDetailComponent,
    resolve: {
      invoiceTransactions: InvoiceTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvoiceTransactionsUpdateComponent,
    resolve: {
      invoiceTransactions: InvoiceTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvoiceTransactionsUpdateComponent,
    resolve: {
      invoiceTransactions: InvoiceTransactionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoiceTransactionsRoute)],
  exports: [RouterModule],
})
export class InvoiceTransactionsRoutingModule {}
