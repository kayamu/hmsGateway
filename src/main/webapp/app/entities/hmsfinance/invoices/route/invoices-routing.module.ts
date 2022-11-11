import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InvoicesComponent } from '../list/invoices.component';
import { InvoicesDetailComponent } from '../detail/invoices-detail.component';
import { InvoicesUpdateComponent } from '../update/invoices-update.component';
import { InvoicesRoutingResolveService } from './invoices-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const invoicesRoute: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InvoicesDetailComponent,
    resolve: {
      invoices: InvoicesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvoicesUpdateComponent,
    resolve: {
      invoices: InvoicesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvoicesUpdateComponent,
    resolve: {
      invoices: InvoicesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoicesRoute)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
