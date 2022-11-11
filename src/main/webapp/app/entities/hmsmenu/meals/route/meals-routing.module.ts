import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MealsComponent } from '../list/meals.component';
import { MealsDetailComponent } from '../detail/meals-detail.component';
import { MealsUpdateComponent } from '../update/meals-update.component';
import { MealsRoutingResolveService } from './meals-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const mealsRoute: Routes = [
  {
    path: '',
    component: MealsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MealsDetailComponent,
    resolve: {
      meals: MealsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MealsUpdateComponent,
    resolve: {
      meals: MealsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MealsUpdateComponent,
    resolve: {
      meals: MealsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mealsRoute)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
