import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConditionDetailsComponent } from '../list/condition-details.component';
import { ConditionDetailsDetailComponent } from '../detail/condition-details-detail.component';
import { ConditionDetailsUpdateComponent } from '../update/condition-details-update.component';
import { ConditionDetailsRoutingResolveService } from './condition-details-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const conditionDetailsRoute: Routes = [
  {
    path: '',
    component: ConditionDetailsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConditionDetailsDetailComponent,
    resolve: {
      conditionDetails: ConditionDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConditionDetailsUpdateComponent,
    resolve: {
      conditionDetails: ConditionDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConditionDetailsUpdateComponent,
    resolve: {
      conditionDetails: ConditionDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(conditionDetailsRoute)],
  exports: [RouterModule],
})
export class ConditionDetailsRoutingModule {}
