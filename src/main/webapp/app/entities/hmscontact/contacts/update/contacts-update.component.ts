import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ContactsFormService, ContactsFormGroup } from './contacts-form.service';
import { IContacts } from '../contacts.model';
import { ContactsService } from '../service/contacts.service';
import { IContactAddresses } from 'app/entities/hmscontact/contact-addresses/contact-addresses.model';
import { ContactAddressesService } from 'app/entities/hmscontact/contact-addresses/service/contact-addresses.service';
import { CONTACTTYPE } from 'app/entities/enumerations/contacttype.model';

@Component({
  selector: 'jhi-contacts-update',
  templateUrl: './contacts-update.component.html',
})
export class ContactsUpdateComponent implements OnInit {
  isSaving = false;
  contacts: IContacts | null = null;
  cONTACTTYPEValues = Object.keys(CONTACTTYPE);

  contactAddressesSharedCollection: IContactAddresses[] = [];

  editForm: ContactsFormGroup = this.contactsFormService.createContactsFormGroup();

  constructor(
    protected contactsService: ContactsService,
    protected contactsFormService: ContactsFormService,
    protected contactAddressesService: ContactAddressesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareContactAddresses = (o1: IContactAddresses | null, o2: IContactAddresses | null): boolean =>
    this.contactAddressesService.compareContactAddresses(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contacts }) => {
      this.contacts = contacts;
      if (contacts) {
        this.updateForm(contacts);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contacts = this.contactsFormService.getContacts(this.editForm);
    if (contacts.id !== null) {
      this.subscribeToSaveResponse(this.contactsService.update(contacts));
    } else {
      this.subscribeToSaveResponse(this.contactsService.create(contacts));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContacts>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(contacts: IContacts): void {
    this.contacts = contacts;
    this.contactsFormService.resetForm(this.editForm, contacts);

    this.contactAddressesSharedCollection = this.contactAddressesService.addContactAddressesToCollectionIfMissing<IContactAddresses>(
      this.contactAddressesSharedCollection,
      ...(contacts.contactAddresses ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.contactAddressesService
      .query()
      .pipe(map((res: HttpResponse<IContactAddresses[]>) => res.body ?? []))
      .pipe(
        map((contactAddresses: IContactAddresses[]) =>
          this.contactAddressesService.addContactAddressesToCollectionIfMissing<IContactAddresses>(
            contactAddresses,
            ...(this.contacts?.contactAddresses ?? [])
          )
        )
      )
      .subscribe((contactAddresses: IContactAddresses[]) => (this.contactAddressesSharedCollection = contactAddresses));
  }
}
