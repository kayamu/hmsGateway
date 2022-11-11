import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MenuGroupsComponent } from '../list/menu-groups.component';
import { MenuGroupsDetailComponent } from '../detail/menu-groups-detail.component';
import { MenuGroupsUpdateComponent } from '../update/menu-groups-update.component';
import { MenuGroupsRoutingResolveService } from './menu-groups-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const menuGroupsRoute: Routes = [
  {
    path: '',
    component: MenuGroupsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MenuGroupsDetailComponent,
    resolve: {
      menuGroups: MenuGroupsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MenuGroupsUpdateComponent,
    resolve: {
      menuGroups: MenuGroupsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MenuGroupsUpdateComponent,
    resolve: {
      menuGroups: MenuGroupsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(menuGroupsRoute)],
  exports: [RouterModule],
})
export class MenuGroupsRoutingModule {}
