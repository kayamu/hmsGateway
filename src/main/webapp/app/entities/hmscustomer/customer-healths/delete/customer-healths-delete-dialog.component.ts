import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerHealths } from '../customer-healths.model';
import { CustomerHealthsService } from '../service/customer-healths.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './customer-healths-delete-dialog.component.html',
})
export class CustomerHealthsDeleteDialogComponent {
  customerHealths?: ICustomerHealths;

  constructor(protected customerHealthsService: CustomerHealthsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerHealthsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
