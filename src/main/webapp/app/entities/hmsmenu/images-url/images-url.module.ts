import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ImagesUrlComponent } from './list/images-url.component';
import { ImagesUrlDetailComponent } from './detail/images-url-detail.component';
import { ImagesUrlUpdateComponent } from './update/images-url-update.component';
import { ImagesUrlDeleteDialogComponent } from './delete/images-url-delete-dialog.component';
import { ImagesUrlRoutingModule } from './route/images-url-routing.module';

@NgModule({
  imports: [SharedModule, ImagesUrlRoutingModule],
  declarations: [ImagesUrlComponent, ImagesUrlDetailComponent, ImagesUrlUpdateComponent, ImagesUrlDeleteDialogComponent],
})
export class HmsmenuImagesUrlModule {}
