import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../contact-addresses.test-samples';

import { ContactAddressesFormService } from './contact-addresses-form.service';

describe('ContactAddresses Form Service', () => {
  let service: ContactAddressesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactAddressesFormService);
  });

  describe('Service methods', () => {
    describe('createContactAddressesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContactAddressesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            bussinessName: expect.any(Object),
            bussinessId: expect.any(Object),
            address1: expect.any(Object),
            address2: expect.any(Object),
            city: expect.any(Object),
            postalCode: expect.any(Object),
            province: expect.any(Object),
            detail: expect.any(Object),
            active: expect.any(Object),
            contractStartDate: expect.any(Object),
            agrrementId: expect.any(Object),
            employmentType: expect.any(Object),
            hourlyRate: expect.any(Object),
            createdDate: expect.any(Object),
            contacts: expect.any(Object),
          })
        );
      });

      it('passing IContactAddresses should create a new form with FormGroup', () => {
        const formGroup = service.createContactAddressesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            bussinessName: expect.any(Object),
            bussinessId: expect.any(Object),
            address1: expect.any(Object),
            address2: expect.any(Object),
            city: expect.any(Object),
            postalCode: expect.any(Object),
            province: expect.any(Object),
            detail: expect.any(Object),
            active: expect.any(Object),
            contractStartDate: expect.any(Object),
            agrrementId: expect.any(Object),
            employmentType: expect.any(Object),
            hourlyRate: expect.any(Object),
            createdDate: expect.any(Object),
            contacts: expect.any(Object),
          })
        );
      });
    });

    describe('getContactAddresses', () => {
      it('should return NewContactAddresses for default ContactAddresses initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createContactAddressesFormGroup(sampleWithNewData);

        const contactAddresses = service.getContactAddresses(formGroup) as any;

        expect(contactAddresses).toMatchObject(sampleWithNewData);
      });

      it('should return NewContactAddresses for empty ContactAddresses initial value', () => {
        const formGroup = service.createContactAddressesFormGroup();

        const contactAddresses = service.getContactAddresses(formGroup) as any;

        expect(contactAddresses).toMatchObject({});
      });

      it('should return IContactAddresses', () => {
        const formGroup = service.createContactAddressesFormGroup(sampleWithRequiredData);

        const contactAddresses = service.getContactAddresses(formGroup) as any;

        expect(contactAddresses).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContactAddresses should not enable id FormControl', () => {
        const formGroup = service.createContactAddressesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContactAddresses should disable id FormControl', () => {
        const formGroup = service.createContactAddressesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
