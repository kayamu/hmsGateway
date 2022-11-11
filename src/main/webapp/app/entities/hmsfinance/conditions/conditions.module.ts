import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConditionsComponent } from './list/conditions.component';
import { ConditionsDetailComponent } from './detail/conditions-detail.component';
import { ConditionsUpdateComponent } from './update/conditions-update.component';
import { ConditionsDeleteDialogComponent } from './delete/conditions-delete-dialog.component';
import { ConditionsRoutingModule } from './route/conditions-routing.module';

@NgModule({
  imports: [SharedModule, ConditionsRoutingModule],
  declarations: [ConditionsComponent, ConditionsDetailComponent, ConditionsUpdateComponent, ConditionsDeleteDialogComponent],
})
export class HmsfinanceConditionsModule {}
