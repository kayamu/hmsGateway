import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CookOrdersComponent } from './list/cook-orders.component';
import { CookOrdersDetailComponent } from './detail/cook-orders-detail.component';
import { CookOrdersUpdateComponent } from './update/cook-orders-update.component';
import { CookOrdersDeleteDialogComponent } from './delete/cook-orders-delete-dialog.component';
import { CookOrdersRoutingModule } from './route/cook-orders-routing.module';

@NgModule({
  imports: [SharedModule, CookOrdersRoutingModule],
  declarations: [CookOrdersComponent, CookOrdersDetailComponent, CookOrdersUpdateComponent, CookOrdersDeleteDialogComponent],
})
export class HmskitchenCookOrdersModule {}
