import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TemplatesComponent } from '../list/templates.component';
import { TemplatesDetailComponent } from '../detail/templates-detail.component';
import { TemplatesUpdateComponent } from '../update/templates-update.component';
import { TemplatesRoutingResolveService } from './templates-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const templatesRoute: Routes = [
  {
    path: '',
    component: TemplatesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TemplatesDetailComponent,
    resolve: {
      templates: TemplatesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TemplatesUpdateComponent,
    resolve: {
      templates: TemplatesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TemplatesUpdateComponent,
    resolve: {
      templates: TemplatesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(templatesRoute)],
  exports: [RouterModule],
})
export class TemplatesRoutingModule {}
