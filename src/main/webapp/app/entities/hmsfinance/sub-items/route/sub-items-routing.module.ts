import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SubItemsComponent } from '../list/sub-items.component';
import { SubItemsDetailComponent } from '../detail/sub-items-detail.component';
import { SubItemsUpdateComponent } from '../update/sub-items-update.component';
import { SubItemsRoutingResolveService } from './sub-items-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const subItemsRoute: Routes = [
  {
    path: '',
    component: SubItemsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubItemsDetailComponent,
    resolve: {
      subItems: SubItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubItemsUpdateComponent,
    resolve: {
      subItems: SubItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubItemsUpdateComponent,
    resolve: {
      subItems: SubItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(subItemsRoute)],
  exports: [RouterModule],
})
export class SubItemsRoutingModule {}
