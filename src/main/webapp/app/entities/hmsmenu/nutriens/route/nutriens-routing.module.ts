import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NutriensComponent } from '../list/nutriens.component';
import { NutriensDetailComponent } from '../detail/nutriens-detail.component';
import { NutriensUpdateComponent } from '../update/nutriens-update.component';
import { NutriensRoutingResolveService } from './nutriens-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const nutriensRoute: Routes = [
  {
    path: '',
    component: NutriensComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NutriensDetailComponent,
    resolve: {
      nutriens: NutriensRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NutriensUpdateComponent,
    resolve: {
      nutriens: NutriensRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NutriensUpdateComponent,
    resolve: {
      nutriens: NutriensRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nutriensRoute)],
  exports: [RouterModule],
})
export class NutriensRoutingModule {}
