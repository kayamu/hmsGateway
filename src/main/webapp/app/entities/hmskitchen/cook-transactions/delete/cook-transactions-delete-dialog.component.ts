import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICookTransactions } from '../cook-transactions.model';
import { CookTransactionsService } from '../service/cook-transactions.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './cook-transactions-delete-dialog.component.html',
})
export class CookTransactionsDeleteDialogComponent {
  cookTransactions?: ICookTransactions;

  constructor(protected cookTransactionsService: CookTransactionsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cookTransactionsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
