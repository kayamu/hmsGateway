import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DeliveryOrdersComponent } from './list/delivery-orders.component';
import { DeliveryOrdersDetailComponent } from './detail/delivery-orders-detail.component';
import { DeliveryOrdersUpdateComponent } from './update/delivery-orders-update.component';
import { DeliveryOrdersDeleteDialogComponent } from './delete/delivery-orders-delete-dialog.component';
import { DeliveryOrdersRoutingModule } from './route/delivery-orders-routing.module';

@NgModule({
  imports: [SharedModule, DeliveryOrdersRoutingModule],
  declarations: [
    DeliveryOrdersComponent,
    DeliveryOrdersDetailComponent,
    DeliveryOrdersUpdateComponent,
    DeliveryOrdersDeleteDialogComponent,
  ],
})
export class HmsdeliveryDeliveryOrdersModule {}
