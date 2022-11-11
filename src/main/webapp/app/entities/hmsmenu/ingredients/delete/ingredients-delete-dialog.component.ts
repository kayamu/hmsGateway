import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IIngredients } from '../ingredients.model';
import { IngredientsService } from '../service/ingredients.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ingredients-delete-dialog.component.html',
})
export class IngredientsDeleteDialogComponent {
  ingredients?: IIngredients;

  constructor(protected ingredientsService: IngredientsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ingredientsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
