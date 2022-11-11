import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INutriens } from '../nutriens.model';
import { NutriensService } from '../service/nutriens.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './nutriens-delete-dialog.component.html',
})
export class NutriensDeleteDialogComponent {
  nutriens?: INutriens;

  constructor(protected nutriensService: NutriensService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nutriensService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
