import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AllergensComponent } from './list/allergens.component';
import { AllergensDetailComponent } from './detail/allergens-detail.component';
import { AllergensUpdateComponent } from './update/allergens-update.component';
import { AllergensDeleteDialogComponent } from './delete/allergens-delete-dialog.component';
import { AllergensRoutingModule } from './route/allergens-routing.module';

@NgModule({
  imports: [SharedModule, AllergensRoutingModule],
  declarations: [AllergensComponent, AllergensDetailComponent, AllergensUpdateComponent, AllergensDeleteDialogComponent],
})
export class HmscustomerAllergensModule {}
