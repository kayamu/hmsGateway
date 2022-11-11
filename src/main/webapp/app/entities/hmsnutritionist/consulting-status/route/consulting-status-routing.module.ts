import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConsultingStatusComponent } from '../list/consulting-status.component';
import { ConsultingStatusDetailComponent } from '../detail/consulting-status-detail.component';
import { ConsultingStatusUpdateComponent } from '../update/consulting-status-update.component';
import { ConsultingStatusRoutingResolveService } from './consulting-status-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const consultingStatusRoute: Routes = [
  {
    path: '',
    component: ConsultingStatusComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsultingStatusDetailComponent,
    resolve: {
      consultingStatus: ConsultingStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsultingStatusUpdateComponent,
    resolve: {
      consultingStatus: ConsultingStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsultingStatusUpdateComponent,
    resolve: {
      consultingStatus: ConsultingStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(consultingStatusRoute)],
  exports: [RouterModule],
})
export class ConsultingStatusRoutingModule {}
