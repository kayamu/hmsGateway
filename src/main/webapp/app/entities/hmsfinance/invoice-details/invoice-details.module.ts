import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InvoiceDetailsComponent } from './list/invoice-details.component';
import { InvoiceDetailsDetailComponent } from './detail/invoice-details-detail.component';
import { InvoiceDetailsUpdateComponent } from './update/invoice-details-update.component';
import { InvoiceDetailsDeleteDialogComponent } from './delete/invoice-details-delete-dialog.component';
import { InvoiceDetailsRoutingModule } from './route/invoice-details-routing.module';

@NgModule({
  imports: [SharedModule, InvoiceDetailsRoutingModule],
  declarations: [
    InvoiceDetailsComponent,
    InvoiceDetailsDetailComponent,
    InvoiceDetailsUpdateComponent,
    InvoiceDetailsDeleteDialogComponent,
  ],
})
export class HmsfinanceInvoiceDetailsModule {}
