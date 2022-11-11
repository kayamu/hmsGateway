import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TemplateItemsComponent } from './list/template-items.component';
import { TemplateItemsDetailComponent } from './detail/template-items-detail.component';
import { TemplateItemsUpdateComponent } from './update/template-items-update.component';
import { TemplateItemsDeleteDialogComponent } from './delete/template-items-delete-dialog.component';
import { TemplateItemsRoutingModule } from './route/template-items-routing.module';

@NgModule({
  imports: [SharedModule, TemplateItemsRoutingModule],
  declarations: [TemplateItemsComponent, TemplateItemsDetailComponent, TemplateItemsUpdateComponent, TemplateItemsDeleteDialogComponent],
})
export class HmsfinanceTemplateItemsModule {}
