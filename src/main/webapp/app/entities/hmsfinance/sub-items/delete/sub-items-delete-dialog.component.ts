import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubItems } from '../sub-items.model';
import { SubItemsService } from '../service/sub-items.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './sub-items-delete-dialog.component.html',
})
export class SubItemsDeleteDialogComponent {
  subItems?: ISubItems;

  constructor(protected subItemsService: SubItemsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subItemsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
