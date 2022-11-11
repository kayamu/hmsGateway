import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliveryTransactions } from '../delivery-transactions.model';
import { DeliveryTransactionsService } from '../service/delivery-transactions.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './delivery-transactions-delete-dialog.component.html',
})
export class DeliveryTransactionsDeleteDialogComponent {
  deliveryTransactions?: IDeliveryTransactions;

  constructor(protected deliveryTransactionsService: DeliveryTransactionsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliveryTransactionsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
