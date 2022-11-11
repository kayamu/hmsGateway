import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TemplatesComponent } from './list/templates.component';
import { TemplatesDetailComponent } from './detail/templates-detail.component';
import { TemplatesUpdateComponent } from './update/templates-update.component';
import { TemplatesDeleteDialogComponent } from './delete/templates-delete-dialog.component';
import { TemplatesRoutingModule } from './route/templates-routing.module';

@NgModule({
  imports: [SharedModule, TemplatesRoutingModule],
  declarations: [TemplatesComponent, TemplatesDetailComponent, TemplatesUpdateComponent, TemplatesDeleteDialogComponent],
})
export class HmsfinanceTemplatesModule {}
