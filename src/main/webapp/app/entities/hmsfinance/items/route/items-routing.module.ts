import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ItemsComponent } from '../list/items.component';
import { ItemsDetailComponent } from '../detail/items-detail.component';
import { ItemsUpdateComponent } from '../update/items-update.component';
import { ItemsRoutingResolveService } from './items-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const itemsRoute: Routes = [
  {
    path: '',
    component: ItemsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemsDetailComponent,
    resolve: {
      items: ItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemsUpdateComponent,
    resolve: {
      items: ItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemsUpdateComponent,
    resolve: {
      items: ItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(itemsRoute)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
