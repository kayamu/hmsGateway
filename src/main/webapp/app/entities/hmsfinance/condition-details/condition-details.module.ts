import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConditionDetailsComponent } from './list/condition-details.component';
import { ConditionDetailsDetailComponent } from './detail/condition-details-detail.component';
import { ConditionDetailsUpdateComponent } from './update/condition-details-update.component';
import { ConditionDetailsDeleteDialogComponent } from './delete/condition-details-delete-dialog.component';
import { ConditionDetailsRoutingModule } from './route/condition-details-routing.module';

@NgModule({
  imports: [SharedModule, ConditionDetailsRoutingModule],
  declarations: [
    ConditionDetailsComponent,
    ConditionDetailsDetailComponent,
    ConditionDetailsUpdateComponent,
    ConditionDetailsDeleteDialogComponent,
  ],
})
export class HmsfinanceConditionDetailsModule {}
