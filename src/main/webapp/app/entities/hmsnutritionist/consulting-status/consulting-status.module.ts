import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConsultingStatusComponent } from './list/consulting-status.component';
import { ConsultingStatusDetailComponent } from './detail/consulting-status-detail.component';
import { ConsultingStatusUpdateComponent } from './update/consulting-status-update.component';
import { ConsultingStatusDeleteDialogComponent } from './delete/consulting-status-delete-dialog.component';
import { ConsultingStatusRoutingModule } from './route/consulting-status-routing.module';

@NgModule({
  imports: [SharedModule, ConsultingStatusRoutingModule],
  declarations: [
    ConsultingStatusComponent,
    ConsultingStatusDetailComponent,
    ConsultingStatusUpdateComponent,
    ConsultingStatusDeleteDialogComponent,
  ],
})
export class HmsnutritionistConsultingStatusModule {}
