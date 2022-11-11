import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConsultingsComponent } from './list/consultings.component';
import { ConsultingsDetailComponent } from './detail/consultings-detail.component';
import { ConsultingsUpdateComponent } from './update/consultings-update.component';
import { ConsultingsDeleteDialogComponent } from './delete/consultings-delete-dialog.component';
import { ConsultingsRoutingModule } from './route/consultings-routing.module';

@NgModule({
  imports: [SharedModule, ConsultingsRoutingModule],
  declarations: [ConsultingsComponent, ConsultingsDetailComponent, ConsultingsUpdateComponent, ConsultingsDeleteDialogComponent],
})
export class HmsnutritionistConsultingsModule {}
