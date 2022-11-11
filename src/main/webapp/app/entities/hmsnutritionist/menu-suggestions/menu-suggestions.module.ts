import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MenuSuggestionsComponent } from './list/menu-suggestions.component';
import { MenuSuggestionsDetailComponent } from './detail/menu-suggestions-detail.component';
import { MenuSuggestionsUpdateComponent } from './update/menu-suggestions-update.component';
import { MenuSuggestionsDeleteDialogComponent } from './delete/menu-suggestions-delete-dialog.component';
import { MenuSuggestionsRoutingModule } from './route/menu-suggestions-routing.module';

@NgModule({
  imports: [SharedModule, MenuSuggestionsRoutingModule],
  declarations: [
    MenuSuggestionsComponent,
    MenuSuggestionsDetailComponent,
    MenuSuggestionsUpdateComponent,
    MenuSuggestionsDeleteDialogComponent,
  ],
})
export class HmsnutritionistMenuSuggestionsModule {}
