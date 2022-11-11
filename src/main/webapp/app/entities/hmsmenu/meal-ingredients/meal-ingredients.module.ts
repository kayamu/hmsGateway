import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MealIngredientsComponent } from './list/meal-ingredients.component';
import { MealIngredientsDetailComponent } from './detail/meal-ingredients-detail.component';
import { MealIngredientsUpdateComponent } from './update/meal-ingredients-update.component';
import { MealIngredientsDeleteDialogComponent } from './delete/meal-ingredients-delete-dialog.component';
import { MealIngredientsRoutingModule } from './route/meal-ingredients-routing.module';

@NgModule({
  imports: [SharedModule, MealIngredientsRoutingModule],
  declarations: [
    MealIngredientsComponent,
    MealIngredientsDetailComponent,
    MealIngredientsUpdateComponent,
    MealIngredientsDeleteDialogComponent,
  ],
})
export class HmsmenuMealIngredientsModule {}
