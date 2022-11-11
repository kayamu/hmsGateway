import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MenusComponent } from './list/menus.component';
import { MenusDetailComponent } from './detail/menus-detail.component';
import { MenusUpdateComponent } from './update/menus-update.component';
import { MenusDeleteDialogComponent } from './delete/menus-delete-dialog.component';
import { MenusRoutingModule } from './route/menus-routing.module';

@NgModule({
  imports: [SharedModule, MenusRoutingModule],
  declarations: [MenusComponent, MenusDetailComponent, MenusUpdateComponent, MenusDeleteDialogComponent],
})
export class HmsmenuMenusModule {}
