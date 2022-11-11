import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InvoiceTransactionsComponent } from './list/invoice-transactions.component';
import { InvoiceTransactionsDetailComponent } from './detail/invoice-transactions-detail.component';
import { InvoiceTransactionsUpdateComponent } from './update/invoice-transactions-update.component';
import { InvoiceTransactionsDeleteDialogComponent } from './delete/invoice-transactions-delete-dialog.component';
import { InvoiceTransactionsRoutingModule } from './route/invoice-transactions-routing.module';

@NgModule({
  imports: [SharedModule, InvoiceTransactionsRoutingModule],
  declarations: [
    InvoiceTransactionsComponent,
    InvoiceTransactionsDetailComponent,
    InvoiceTransactionsUpdateComponent,
    InvoiceTransactionsDeleteDialogComponent,
  ],
})
export class HmsfinanceInvoiceTransactionsModule {}
