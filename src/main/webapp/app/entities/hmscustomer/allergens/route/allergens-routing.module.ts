import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AllergensComponent } from '../list/allergens.component';
import { AllergensDetailComponent } from '../detail/allergens-detail.component';
import { AllergensUpdateComponent } from '../update/allergens-update.component';
import { AllergensRoutingResolveService } from './allergens-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const allergensRoute: Routes = [
  {
    path: '',
    component: AllergensComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AllergensDetailComponent,
    resolve: {
      allergens: AllergensRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AllergensUpdateComponent,
    resolve: {
      allergens: AllergensRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AllergensUpdateComponent,
    resolve: {
      allergens: AllergensRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(allergensRoute)],
  exports: [RouterModule],
})
export class AllergensRoutingModule {}
