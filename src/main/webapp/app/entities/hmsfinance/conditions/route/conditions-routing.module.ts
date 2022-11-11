import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConditionsComponent } from '../list/conditions.component';
import { ConditionsDetailComponent } from '../detail/conditions-detail.component';
import { ConditionsUpdateComponent } from '../update/conditions-update.component';
import { ConditionsRoutingResolveService } from './conditions-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const conditionsRoute: Routes = [
  {
    path: '',
    component: ConditionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConditionsDetailComponent,
    resolve: {
      conditions: ConditionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConditionsUpdateComponent,
    resolve: {
      conditions: ConditionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConditionsUpdateComponent,
    resolve: {
      conditions: ConditionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(conditionsRoute)],
  exports: [RouterModule],
})
export class ConditionsRoutingModule {}
