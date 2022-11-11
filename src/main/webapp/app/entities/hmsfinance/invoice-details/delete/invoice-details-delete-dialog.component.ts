import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvoiceDetails } from '../invoice-details.model';
import { InvoiceDetailsService } from '../service/invoice-details.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './invoice-details-delete-dialog.component.html',
})
export class InvoiceDetailsDeleteDialogComponent {
  invoiceDetails?: IInvoiceDetails;

  constructor(protected invoiceDetailsService: InvoiceDetailsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.invoiceDetailsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
