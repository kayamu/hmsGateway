import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { IngredientsComponent } from './list/ingredients.component';
import { IngredientsDetailComponent } from './detail/ingredients-detail.component';
import { IngredientsUpdateComponent } from './update/ingredients-update.component';
import { IngredientsDeleteDialogComponent } from './delete/ingredients-delete-dialog.component';
import { IngredientsRoutingModule } from './route/ingredients-routing.module';

@NgModule({
  imports: [SharedModule, IngredientsRoutingModule],
  declarations: [IngredientsComponent, IngredientsDetailComponent, IngredientsUpdateComponent, IngredientsDeleteDialogComponent],
})
export class HmsmenuIngredientsModule {}
