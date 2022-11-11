import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RecipiesComponent } from './list/recipies.component';
import { RecipiesDetailComponent } from './detail/recipies-detail.component';
import { RecipiesUpdateComponent } from './update/recipies-update.component';
import { RecipiesDeleteDialogComponent } from './delete/recipies-delete-dialog.component';
import { RecipiesRoutingModule } from './route/recipies-routing.module';

@NgModule({
  imports: [SharedModule, RecipiesRoutingModule],
  declarations: [RecipiesComponent, RecipiesDetailComponent, RecipiesUpdateComponent, RecipiesDeleteDialogComponent],
})
export class HmsmenuRecipiesModule {}
