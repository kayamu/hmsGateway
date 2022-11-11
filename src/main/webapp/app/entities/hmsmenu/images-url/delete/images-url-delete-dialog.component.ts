import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IImagesUrl } from '../images-url.model';
import { ImagesUrlService } from '../service/images-url.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './images-url-delete-dialog.component.html',
})
export class ImagesUrlDeleteDialogComponent {
  imagesUrl?: IImagesUrl;

  constructor(protected imagesUrlService: ImagesUrlService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.imagesUrlService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
