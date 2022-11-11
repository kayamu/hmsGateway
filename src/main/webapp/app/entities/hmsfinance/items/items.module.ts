import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ItemsComponent } from './list/items.component';
import { ItemsDetailComponent } from './detail/items-detail.component';
import { ItemsUpdateComponent } from './update/items-update.component';
import { ItemsDeleteDialogComponent } from './delete/items-delete-dialog.component';
import { ItemsRoutingModule } from './route/items-routing.module';

@NgModule({
  imports: [SharedModule, ItemsRoutingModule],
  declarations: [ItemsComponent, ItemsDetailComponent, ItemsUpdateComponent, ItemsDeleteDialogComponent],
})
export class HmsfinanceItemsModule {}
