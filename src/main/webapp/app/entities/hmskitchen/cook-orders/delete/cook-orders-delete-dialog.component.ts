import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICookOrders } from '../cook-orders.model';
import { CookOrdersService } from '../service/cook-orders.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './cook-orders-delete-dialog.component.html',
})
export class CookOrdersDeleteDialogComponent {
  cookOrders?: ICookOrders;

  constructor(protected cookOrdersService: CookOrdersService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cookOrdersService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
