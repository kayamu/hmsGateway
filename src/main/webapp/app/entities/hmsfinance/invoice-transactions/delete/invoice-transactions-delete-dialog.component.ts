import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvoiceTransactions } from '../invoice-transactions.model';
import { InvoiceTransactionsService } from '../service/invoice-transactions.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './invoice-transactions-delete-dialog.component.html',
})
export class InvoiceTransactionsDeleteDialogComponent {
  invoiceTransactions?: IInvoiceTransactions;

  constructor(protected invoiceTransactionsService: InvoiceTransactionsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.invoiceTransactionsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
