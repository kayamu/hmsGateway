import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InvoiceDetailsComponent } from '../list/invoice-details.component';
import { InvoiceDetailsDetailComponent } from '../detail/invoice-details-detail.component';
import { InvoiceDetailsUpdateComponent } from '../update/invoice-details-update.component';
import { InvoiceDetailsRoutingResolveService } from './invoice-details-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const invoiceDetailsRoute: Routes = [
  {
    path: '',
    component: InvoiceDetailsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InvoiceDetailsDetailComponent,
    resolve: {
      invoiceDetails: InvoiceDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvoiceDetailsUpdateComponent,
    resolve: {
      invoiceDetails: InvoiceDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvoiceDetailsUpdateComponent,
    resolve: {
      invoiceDetails: InvoiceDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoiceDetailsRoute)],
  exports: [RouterModule],
})
export class InvoiceDetailsRoutingModule {}
