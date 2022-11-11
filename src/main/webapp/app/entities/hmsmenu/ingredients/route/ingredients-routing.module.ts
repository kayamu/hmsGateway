import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { IngredientsComponent } from '../list/ingredients.component';
import { IngredientsDetailComponent } from '../detail/ingredients-detail.component';
import { IngredientsUpdateComponent } from '../update/ingredients-update.component';
import { IngredientsRoutingResolveService } from './ingredients-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ingredientsRoute: Routes = [
  {
    path: '',
    component: IngredientsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IngredientsDetailComponent,
    resolve: {
      ingredients: IngredientsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IngredientsUpdateComponent,
    resolve: {
      ingredients: IngredientsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IngredientsUpdateComponent,
    resolve: {
      ingredients: IngredientsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ingredientsRoute)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule {}
