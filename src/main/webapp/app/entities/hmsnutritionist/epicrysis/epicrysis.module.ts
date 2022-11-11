import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EpicrysisComponent } from './list/epicrysis.component';
import { EpicrysisDetailComponent } from './detail/epicrysis-detail.component';
import { EpicrysisUpdateComponent } from './update/epicrysis-update.component';
import { EpicrysisDeleteDialogComponent } from './delete/epicrysis-delete-dialog.component';
import { EpicrysisRoutingModule } from './route/epicrysis-routing.module';

@NgModule({
  imports: [SharedModule, EpicrysisRoutingModule],
  declarations: [EpicrysisComponent, EpicrysisDetailComponent, EpicrysisUpdateComponent, EpicrysisDeleteDialogComponent],
})
export class HmsnutritionistEpicrysisModule {}
