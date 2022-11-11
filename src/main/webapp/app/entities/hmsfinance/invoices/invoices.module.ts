import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InvoicesComponent } from './list/invoices.component';
import { InvoicesDetailComponent } from './detail/invoices-detail.component';
import { InvoicesUpdateComponent } from './update/invoices-update.component';
import { InvoicesDeleteDialogComponent } from './delete/invoices-delete-dialog.component';
import { InvoicesRoutingModule } from './route/invoices-routing.module';

@NgModule({
  imports: [SharedModule, InvoicesRoutingModule],
  declarations: [InvoicesComponent, InvoicesDetailComponent, InvoicesUpdateComponent, InvoicesDeleteDialogComponent],
})
export class HmsfinanceInvoicesModule {}
