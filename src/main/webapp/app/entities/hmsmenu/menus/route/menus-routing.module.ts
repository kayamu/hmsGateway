import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MenusComponent } from '../list/menus.component';
import { MenusDetailComponent } from '../detail/menus-detail.component';
import { MenusUpdateComponent } from '../update/menus-update.component';
import { MenusRoutingResolveService } from './menus-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const menusRoute: Routes = [
  {
    path: '',
    component: MenusComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MenusDetailComponent,
    resolve: {
      menus: MenusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MenusUpdateComponent,
    resolve: {
      menus: MenusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MenusUpdateComponent,
    resolve: {
      menus: MenusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(menusRoute)],
  exports: [RouterModule],
})
export class MenusRoutingModule {}
