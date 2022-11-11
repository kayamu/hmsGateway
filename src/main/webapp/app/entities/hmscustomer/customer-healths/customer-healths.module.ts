import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerHealthsComponent } from './list/customer-healths.component';
import { CustomerHealthsDetailComponent } from './detail/customer-healths-detail.component';
import { CustomerHealthsUpdateComponent } from './update/customer-healths-update.component';
import { CustomerHealthsDeleteDialogComponent } from './delete/customer-healths-delete-dialog.component';
import { CustomerHealthsRoutingModule } from './route/customer-healths-routing.module';

@NgModule({
  imports: [SharedModule, CustomerHealthsRoutingModule],
  declarations: [
    CustomerHealthsComponent,
    CustomerHealthsDetailComponent,
    CustomerHealthsUpdateComponent,
    CustomerHealthsDeleteDialogComponent,
  ],
})
export class HmscustomerCustomerHealthsModule {}
