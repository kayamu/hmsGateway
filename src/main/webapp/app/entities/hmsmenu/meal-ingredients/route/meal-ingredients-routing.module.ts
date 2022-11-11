import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MealIngredientsComponent } from '../list/meal-ingredients.component';
import { MealIngredientsDetailComponent } from '../detail/meal-ingredients-detail.component';
import { MealIngredientsUpdateComponent } from '../update/meal-ingredients-update.component';
import { MealIngredientsRoutingResolveService } from './meal-ingredients-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const mealIngredientsRoute: Routes = [
  {
    path: '',
    component: MealIngredientsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MealIngredientsDetailComponent,
    resolve: {
      mealIngredients: MealIngredientsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MealIngredientsUpdateComponent,
    resolve: {
      mealIngredients: MealIngredientsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MealIngredientsUpdateComponent,
    resolve: {
      mealIngredients: MealIngredientsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mealIngredientsRoute)],
  exports: [RouterModule],
})
export class MealIngredientsRoutingModule {}
