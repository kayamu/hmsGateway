import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContacts, NewContacts } from '../contacts.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContacts for edit and NewContactsFormGroupInput for create.
 */
type ContactsFormGroupInput = IContacts | PartialWithRequiredKeyOf<NewContacts>;

type ContactsFormDefaults = Pick<NewContacts, 'id' | 'gender' | 'contactAddresses'>;

type ContactsFormGroupContent = {
  id: FormControl<IContacts['id'] | NewContacts['id']>;
  userID: FormControl<IContacts['userID']>;
  type: FormControl<IContacts['type']>;
  name: FormControl<IContacts['name']>;
  hstNumber: FormControl<IContacts['hstNumber']>;
  detail: FormControl<IContacts['detail']>;
  email: FormControl<IContacts['email']>;
  phone: FormControl<IContacts['phone']>;
  gender: FormControl<IContacts['gender']>;
  birthdate: FormControl<IContacts['birthdate']>;
  createdDate: FormControl<IContacts['createdDate']>;
  contactAddresses: FormControl<IContacts['contactAddresses']>;
};

export type ContactsFormGroup = FormGroup<ContactsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContactsFormService {
  createContactsFormGroup(contacts: ContactsFormGroupInput = { id: null }): ContactsFormGroup {
    const contactsRawValue = {
      ...this.getFormDefaults(),
      ...contacts,
    };
    return new FormGroup<ContactsFormGroupContent>({
      id: new FormControl(
        { value: contactsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      userID: new FormControl(contactsRawValue.userID),
      type: new FormControl(contactsRawValue.type),
      name: new FormControl(contactsRawValue.name),
      hstNumber: new FormControl(contactsRawValue.hstNumber),
      detail: new FormControl(contactsRawValue.detail),
      email: new FormControl(contactsRawValue.email),
      phone: new FormControl(contactsRawValue.phone),
      gender: new FormControl(contactsRawValue.gender),
      birthdate: new FormControl(contactsRawValue.birthdate),
      createdDate: new FormControl(contactsRawValue.createdDate),
      contactAddresses: new FormControl(contactsRawValue.contactAddresses ?? []),
    });
  }

  getContacts(form: ContactsFormGroup): IContacts | NewContacts {
    return form.getRawValue() as IContacts | NewContacts;
  }

  resetForm(form: ContactsFormGroup, contacts: ContactsFormGroupInput): void {
    const contactsRawValue = { ...this.getFormDefaults(), ...contacts };
    form.reset(
      {
        ...contactsRawValue,
        id: { value: contactsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContactsFormDefaults {
    return {
      id: null,
      gender: false,
      contactAddresses: [],
    };
  }
}
