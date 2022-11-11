import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsultings } from '../consultings.model';
import { ConsultingsService } from '../service/consultings.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './consultings-delete-dialog.component.html',
})
export class ConsultingsDeleteDialogComponent {
  consultings?: IConsultings;

  constructor(protected consultingsService: ConsultingsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consultingsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
