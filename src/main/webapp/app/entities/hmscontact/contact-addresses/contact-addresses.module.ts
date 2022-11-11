import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContactAddressesComponent } from './list/contact-addresses.component';
import { ContactAddressesDetailComponent } from './detail/contact-addresses-detail.component';
import { ContactAddressesUpdateComponent } from './update/contact-addresses-update.component';
import { ContactAddressesDeleteDialogComponent } from './delete/contact-addresses-delete-dialog.component';
import { ContactAddressesRoutingModule } from './route/contact-addresses-routing.module';

@NgModule({
  imports: [SharedModule, ContactAddressesRoutingModule],
  declarations: [
    ContactAddressesComponent,
    ContactAddressesDetailComponent,
    ContactAddressesUpdateComponent,
    ContactAddressesDeleteDialogComponent,
  ],
})
export class HmscontactContactAddressesModule {}
