import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContactAddressesComponent } from '../list/contact-addresses.component';
import { ContactAddressesDetailComponent } from '../detail/contact-addresses-detail.component';
import { ContactAddressesUpdateComponent } from '../update/contact-addresses-update.component';
import { ContactAddressesRoutingResolveService } from './contact-addresses-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const contactAddressesRoute: Routes = [
  {
    path: '',
    component: ContactAddressesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactAddressesDetailComponent,
    resolve: {
      contactAddresses: ContactAddressesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContactAddressesUpdateComponent,
    resolve: {
      contactAddresses: ContactAddressesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactAddressesUpdateComponent,
    resolve: {
      contactAddresses: ContactAddressesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contactAddressesRoute)],
  exports: [RouterModule],
})
export class ContactAddressesRoutingModule {}
