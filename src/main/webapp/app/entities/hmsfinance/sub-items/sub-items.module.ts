import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SubItemsComponent } from './list/sub-items.component';
import { SubItemsDetailComponent } from './detail/sub-items-detail.component';
import { SubItemsUpdateComponent } from './update/sub-items-update.component';
import { SubItemsDeleteDialogComponent } from './delete/sub-items-delete-dialog.component';
import { SubItemsRoutingModule } from './route/sub-items-routing.module';

@NgModule({
  imports: [SharedModule, SubItemsRoutingModule],
  declarations: [SubItemsComponent, SubItemsDetailComponent, SubItemsUpdateComponent, SubItemsDeleteDialogComponent],
})
export class HmsfinanceSubItemsModule {}
