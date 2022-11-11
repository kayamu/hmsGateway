import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMenuSuggestions } from '../menu-suggestions.model';
import { MenuSuggestionsService } from '../service/menu-suggestions.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './menu-suggestions-delete-dialog.component.html',
})
export class MenuSuggestionsDeleteDialogComponent {
  menuSuggestions?: IMenuSuggestions;

  constructor(protected menuSuggestionsService: MenuSuggestionsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.menuSuggestionsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
