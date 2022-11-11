import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IContactAddresses } from '../contact-addresses.model';
import { ContactAddressesService } from '../service/contact-addresses.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './contact-addresses-delete-dialog.component.html',
})
export class ContactAddressesDeleteDialogComponent {
  contactAddresses?: IContactAddresses;

  constructor(protected contactAddressesService: ContactAddressesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactAddressesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
