import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../menus.test-samples';

import { MenusFormService } from './menus-form.service';

describe('Menus Form Service', () => {
  let service: MenusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusFormService);
  });

  describe('Service methods', () => {
    describe('createMenusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMenusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            menuDay: expect.any(Object),
            menuTime: expect.any(Object),
            contactId: expect.any(Object),
            cost: expect.any(Object),
            salesPrice: expect.any(Object),
            explanation: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
            meals: expect.any(Object),
            nutriens: expect.any(Object),
            menuGroups: expect.any(Object),
          })
        );
      });

      it('passing IMenus should create a new form with FormGroup', () => {
        const formGroup = service.createMenusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            menuDay: expect.any(Object),
            menuTime: expect.any(Object),
            contactId: expect.any(Object),
            cost: expect.any(Object),
            salesPrice: expect.any(Object),
            explanation: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
            meals: expect.any(Object),
            nutriens: expect.any(Object),
            menuGroups: expect.any(Object),
          })
        );
      });
    });

    describe('getMenus', () => {
      it('should return NewMenus for default Menus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMenusFormGroup(sampleWithNewData);

        const menus = service.getMenus(formGroup) as any;

        expect(menus).toMatchObject(sampleWithNewData);
      });

      it('should return NewMenus for empty Menus initial value', () => {
        const formGroup = service.createMenusFormGroup();

        const menus = service.getMenus(formGroup) as any;

        expect(menus).toMatchObject({});
      });

      it('should return IMenus', () => {
        const formGroup = service.createMenusFormGroup(sampleWithRequiredData);

        const menus = service.getMenus(formGroup) as any;

        expect(menus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMenus should not enable id FormControl', () => {
        const formGroup = service.createMenusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMenus should disable id FormControl', () => {
        const formGroup = service.createMenusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
