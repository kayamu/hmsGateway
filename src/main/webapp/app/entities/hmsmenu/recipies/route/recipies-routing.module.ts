import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RecipiesComponent } from '../list/recipies.component';
import { RecipiesDetailComponent } from '../detail/recipies-detail.component';
import { RecipiesUpdateComponent } from '../update/recipies-update.component';
import { RecipiesRoutingResolveService } from './recipies-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const recipiesRoute: Routes = [
  {
    path: '',
    component: RecipiesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RecipiesDetailComponent,
    resolve: {
      recipies: RecipiesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RecipiesUpdateComponent,
    resolve: {
      recipies: RecipiesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RecipiesUpdateComponent,
    resolve: {
      recipies: RecipiesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipiesRoute)],
  exports: [RouterModule],
})
export class RecipiesRoutingModule {}
