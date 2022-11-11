import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsultingStatus } from '../consulting-status.model';
import { ConsultingStatusService } from '../service/consulting-status.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './consulting-status-delete-dialog.component.html',
})
export class ConsultingStatusDeleteDialogComponent {
  consultingStatus?: IConsultingStatus;

  constructor(protected consultingStatusService: ConsultingStatusService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consultingStatusService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
