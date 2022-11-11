import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MenuSuggestionsComponent } from '../list/menu-suggestions.component';
import { MenuSuggestionsDetailComponent } from '../detail/menu-suggestions-detail.component';
import { MenuSuggestionsUpdateComponent } from '../update/menu-suggestions-update.component';
import { MenuSuggestionsRoutingResolveService } from './menu-suggestions-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const menuSuggestionsRoute: Routes = [
  {
    path: '',
    component: MenuSuggestionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MenuSuggestionsDetailComponent,
    resolve: {
      menuSuggestions: MenuSuggestionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MenuSuggestionsUpdateComponent,
    resolve: {
      menuSuggestions: MenuSuggestionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MenuSuggestionsUpdateComponent,
    resolve: {
      menuSuggestions: MenuSuggestionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(menuSuggestionsRoute)],
  exports: [RouterModule],
})
export class MenuSuggestionsRoutingModule {}
