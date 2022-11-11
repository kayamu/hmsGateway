import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentsComponent } from './list/payments.component';
import { PaymentsDetailComponent } from './detail/payments-detail.component';
import { PaymentsUpdateComponent } from './update/payments-update.component';
import { PaymentsDeleteDialogComponent } from './delete/payments-delete-dialog.component';
import { PaymentsRoutingModule } from './route/payments-routing.module';

@NgModule({
  imports: [SharedModule, PaymentsRoutingModule],
  declarations: [PaymentsComponent, PaymentsDetailComponent, PaymentsUpdateComponent, PaymentsDeleteDialogComponent],
})
export class HmsfinancePaymentsModule {}
