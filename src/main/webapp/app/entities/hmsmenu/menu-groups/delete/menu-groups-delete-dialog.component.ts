import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMenuGroups } from '../menu-groups.model';
import { MenuGroupsService } from '../service/menu-groups.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './menu-groups-delete-dialog.component.html',
})
export class MenuGroupsDeleteDialogComponent {
  menuGroups?: IMenuGroups;

  constructor(protected menuGroupsService: MenuGroupsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.menuGroupsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
