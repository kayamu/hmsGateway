import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NutriensComponent } from './list/nutriens.component';
import { NutriensDetailComponent } from './detail/nutriens-detail.component';
import { NutriensUpdateComponent } from './update/nutriens-update.component';
import { NutriensDeleteDialogComponent } from './delete/nutriens-delete-dialog.component';
import { NutriensRoutingModule } from './route/nutriens-routing.module';

@NgModule({
  imports: [SharedModule, NutriensRoutingModule],
  declarations: [NutriensComponent, NutriensDetailComponent, NutriensUpdateComponent, NutriensDeleteDialogComponent],
})
export class HmsmenuNutriensModule {}
