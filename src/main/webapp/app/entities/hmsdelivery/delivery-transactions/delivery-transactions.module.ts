import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DeliveryTransactionsComponent } from './list/delivery-transactions.component';
import { DeliveryTransactionsDetailComponent } from './detail/delivery-transactions-detail.component';
import { DeliveryTransactionsUpdateComponent } from './update/delivery-transactions-update.component';
import { DeliveryTransactionsDeleteDialogComponent } from './delete/delivery-transactions-delete-dialog.component';
import { DeliveryTransactionsRoutingModule } from './route/delivery-transactions-routing.module';

@NgModule({
  imports: [SharedModule, DeliveryTransactionsRoutingModule],
  declarations: [
    DeliveryTransactionsComponent,
    DeliveryTransactionsDetailComponent,
    DeliveryTransactionsUpdateComponent,
    DeliveryTransactionsDeleteDialogComponent,
  ],
})
export class HmsdeliveryDeliveryTransactionsModule {}
