import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MenuGroupsComponent } from './list/menu-groups.component';
import { MenuGroupsDetailComponent } from './detail/menu-groups-detail.component';
import { MenuGroupsUpdateComponent } from './update/menu-groups-update.component';
import { MenuGroupsDeleteDialogComponent } from './delete/menu-groups-delete-dialog.component';
import { MenuGroupsRoutingModule } from './route/menu-groups-routing.module';

@NgModule({
  imports: [SharedModule, MenuGroupsRoutingModule],
  declarations: [MenuGroupsComponent, MenuGroupsDetailComponent, MenuGroupsUpdateComponent, MenuGroupsDeleteDialogComponent],
})
export class HmsmenuMenuGroupsModule {}
