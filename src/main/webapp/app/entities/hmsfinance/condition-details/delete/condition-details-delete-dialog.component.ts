import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConditionDetails } from '../condition-details.model';
import { ConditionDetailsService } from '../service/condition-details.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './condition-details-delete-dialog.component.html',
})
export class ConditionDetailsDeleteDialogComponent {
  conditionDetails?: IConditionDetails;

  constructor(protected conditionDetailsService: ConditionDetailsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conditionDetailsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
