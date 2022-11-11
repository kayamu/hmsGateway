import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ContactAddressesFormService, ContactAddressesFormGroup } from './contact-addresses-form.service';
import { IContactAddresses } from '../contact-addresses.model';
import { ContactAddressesService } from '../service/contact-addresses.service';
import { EMPLOYMENTTYPES } from 'app/entities/enumerations/employmenttypes.model';

@Component({
  selector: 'jhi-contact-addresses-update',
  templateUrl: './contact-addresses-update.component.html',
})
export class ContactAddressesUpdateComponent implements OnInit {
  isSaving = false;
  contactAddresses: IContactAddresses | null = null;
  eMPLOYMENTTYPESValues = Object.keys(EMPLOYMENTTYPES);

  editForm: ContactAddressesFormGroup = this.contactAddressesFormService.createContactAddressesFormGroup();

  constructor(
    protected contactAddressesService: ContactAddressesService,
    protected contactAddressesFormService: ContactAddressesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactAddresses }) => {
      this.contactAddresses = contactAddresses;
      if (contactAddresses) {
        this.updateForm(contactAddresses);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contactAddresses = this.contactAddressesFormService.getContactAddresses(this.editForm);
    if (contactAddresses.id !== null) {
      this.subscribeToSaveResponse(this.contactAddressesService.update(contactAddresses));
    } else {
      this.subscribeToSaveResponse(this.contactAddressesService.create(contactAddresses));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactAddresses>>): void {
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

  protected updateForm(contactAddresses: IContactAddresses): void {
    this.contactAddresses = contactAddresses;
    this.contactAddressesFormService.resetForm(this.editForm, contactAddresses);
  }
}
