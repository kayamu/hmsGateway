import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CookTransactionsComponent } from './list/cook-transactions.component';
import { CookTransactionsDetailComponent } from './detail/cook-transactions-detail.component';
import { CookTransactionsUpdateComponent } from './update/cook-transactions-update.component';
import { CookTransactionsDeleteDialogComponent } from './delete/cook-transactions-delete-dialog.component';
import { CookTransactionsRoutingModule } from './route/cook-transactions-routing.module';

@NgModule({
  imports: [SharedModule, CookTransactionsRoutingModule],
  declarations: [
    CookTransactionsComponent,
    CookTransactionsDetailComponent,
    CookTransactionsUpdateComponent,
    CookTransactionsDeleteDialogComponent,
  ],
})
export class HmskitchenCookTransactionsModule {}
