import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliveryOrders } from '../delivery-orders.model';
import { DeliveryOrdersService } from '../service/delivery-orders.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './delivery-orders-delete-dialog.component.html',
})
export class DeliveryOrdersDeleteDialogComponent {
  deliveryOrders?: IDeliveryOrders;

  constructor(protected deliveryOrdersService: DeliveryOrdersService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliveryOrdersService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
