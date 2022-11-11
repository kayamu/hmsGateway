import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MealsComponent } from './list/meals.component';
import { MealsDetailComponent } from './detail/meals-detail.component';
import { MealsUpdateComponent } from './update/meals-update.component';
import { MealsDeleteDialogComponent } from './delete/meals-delete-dialog.component';
import { MealsRoutingModule } from './route/meals-routing.module';

@NgModule({
  imports: [SharedModule, MealsRoutingModule],
  declarations: [MealsComponent, MealsDetailComponent, MealsUpdateComponent, MealsDeleteDialogComponent],
})
export class HmsmenuMealsModule {}
