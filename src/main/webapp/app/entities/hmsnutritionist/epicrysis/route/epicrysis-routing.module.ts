import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EpicrysisComponent } from '../list/epicrysis.component';
import { EpicrysisDetailComponent } from '../detail/epicrysis-detail.component';
import { EpicrysisUpdateComponent } from '../update/epicrysis-update.component';
import { EpicrysisRoutingResolveService } from './epicrysis-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const epicrysisRoute: Routes = [
  {
    path: '',
    component: EpicrysisComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EpicrysisDetailComponent,
    resolve: {
      epicrysis: EpicrysisRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EpicrysisUpdateComponent,
    resolve: {
      epicrysis: EpicrysisRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EpicrysisUpdateComponent,
    resolve: {
      epicrysis: EpicrysisRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(epicrysisRoute)],
  exports: [RouterModule],
})
export class EpicrysisRoutingModule {}
