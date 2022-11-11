import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContactAddresses, NewContactAddresses } from '../contact-addresses.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContactAddresses for edit and NewContactAddressesFormGroupInput for create.
 */
type ContactAddressesFormGroupInput = IContactAddresses | PartialWithRequiredKeyOf<NewContactAddresses>;

type ContactAddressesFormDefaults = Pick<NewContactAddresses, 'id' | 'active' | 'contacts'>;

type ContactAddressesFormGroupContent = {
  id: FormControl<IContactAddresses['id'] | NewContactAddresses['id']>;
  name: FormControl<IContactAddresses['name']>;
  bussinessName: FormControl<IContactAddresses['bussinessName']>;
  bussinessId: FormControl<IContactAddresses['bussinessId']>;
  address1: FormControl<IContactAddresses['address1']>;
  address2: FormControl<IContactAddresses['address2']>;
  city: FormControl<IContactAddresses['city']>;
  postalCode: FormControl<IContactAddresses['postalCode']>;
  province: FormControl<IContactAddresses['province']>;
  detail: FormControl<IContactAddresses['detail']>;
  active: FormControl<IContactAddresses['active']>;
  contractStartDate: FormControl<IContactAddresses['contractStartDate']>;
  agrrementId: FormControl<IContactAddresses['agrrementId']>;
  employmentType: FormControl<IContactAddresses['employmentType']>;
  hourlyRate: FormControl<IContactAddresses['hourlyRate']>;
  createdDate: FormControl<IContactAddresses['createdDate']>;
  contacts: FormControl<IContactAddresses['contacts']>;
};

export type ContactAddressesFormGroup = FormGroup<ContactAddressesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContactAddressesFormService {
  createContactAddressesFormGroup(contactAddresses: ContactAddressesFormGroupInput = { id: null }): ContactAddressesFormGroup {
    const contactAddressesRawValue = {
      ...this.getFormDefaults(),
      ...contactAddresses,
    };
    return new FormGroup<ContactAddressesFormGroupContent>({
      id: new FormControl(
        { value: contactAddressesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(contactAddressesRawValue.name),
      bussinessName: new FormControl(contactAddressesRawValue.bussinessName),
      bussinessId: new FormControl(contactAddressesRawValue.bussinessId),
      address1: new FormControl(contactAddressesRawValue.address1),
      address2: new FormControl(contactAddressesRawValue.address2),
      city: new FormControl(contactAddressesRawValue.city),
      postalCode: new FormControl(contactAddressesRawValue.postalCode),
      province: new FormControl(contactAddressesRawValue.province),
      detail: new FormControl(contactAddressesRawValue.detail),
      active: new FormControl(contactAddressesRawValue.active),
      contractStartDate: new FormControl(contactAddressesRawValue.contractStartDate),
      agrrementId: new FormControl(contactAddressesRawValue.agrrementId),
      employmentType: new FormControl(contactAddressesRawValue.employmentType),
      hourlyRate: new FormControl(contactAddressesRawValue.hourlyRate),
      createdDate: new FormControl(contactAddressesRawValue.createdDate),
      contacts: new FormControl(contactAddressesRawValue.contacts ?? []),
    });
  }

  getContactAddresses(form: ContactAddressesFormGroup): IContactAddresses | NewContactAddresses {
    return form.getRawValue() as IContactAddresses | NewContactAddresses;
  }

  resetForm(form: ContactAddressesFormGroup, contactAddresses: ContactAddressesFormGroupInput): void {
    const contactAddressesRawValue = { ...this.getFormDefaults(), ...contactAddresses };
    form.reset(
      {
        ...contactAddressesRawValue,
        id: { value: contactAddressesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContactAddressesFormDefaults {
    return {
      id: null,
      active: false,
      contacts: [],
    };
  }
}
