import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITemplateItems } from '../template-items.model';
import { TemplateItemsService } from '../service/template-items.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './template-items-delete-dialog.component.html',
})
export class TemplateItemsDeleteDialogComponent {
  templateItems?: ITemplateItems;

  constructor(protected templateItemsService: TemplateItemsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.templateItemsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
