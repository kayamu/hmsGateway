import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TemplateItemsComponent } from '../list/template-items.component';
import { TemplateItemsDetailComponent } from '../detail/template-items-detail.component';
import { TemplateItemsUpdateComponent } from '../update/template-items-update.component';
import { TemplateItemsRoutingResolveService } from './template-items-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const templateItemsRoute: Routes = [
  {
    path: '',
    component: TemplateItemsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TemplateItemsDetailComponent,
    resolve: {
      templateItems: TemplateItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TemplateItemsUpdateComponent,
    resolve: {
      templateItems: TemplateItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TemplateItemsUpdateComponent,
    resolve: {
      templateItems: TemplateItemsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(templateItemsRoute)],
  exports: [RouterModule],
})
export class TemplateItemsRoutingModule {}
