import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEpicrysis } from '../epicrysis.model';
import { EpicrysisService } from '../service/epicrysis.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './epicrysis-delete-dialog.component.html',
})
export class EpicrysisDeleteDialogComponent {
  epicrysis?: IEpicrysis;

  constructor(protected epicrysisService: EpicrysisService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.epicrysisService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
