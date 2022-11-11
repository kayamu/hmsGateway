import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../menu-groups.test-samples';

import { MenuGroupsFormService } from './menu-groups-form.service';

describe('MenuGroups Form Service', () => {
  let service: MenuGroupsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuGroupsFormService);
  });

  describe('Service methods', () => {
    describe('createMenuGroupsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMenuGroupsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactId: expect.any(Object),
            name: expect.any(Object),
            cost: expect.any(Object),
            salesPrice: expect.any(Object),
            explanation: expect.any(Object),
            goal: expect.any(Object),
            bodyType: expect.any(Object),
            activityLevelMin: expect.any(Object),
            activityLevelMax: expect.any(Object),
            weightMin: expect.any(Object),
            weightMax: expect.any(Object),
            dailyKcalMin: expect.any(Object),
            dailyKcalMax: expect.any(Object),
            targetWeightMin: expect.any(Object),
            targetWeightMax: expect.any(Object),
            unit: expect.any(Object),
            createdDate: expect.any(Object),
            ingradients: expect.any(Object),
            menus: expect.any(Object),
            imagesUrls: expect.any(Object),
            nutriens: expect.any(Object),
          })
        );
      });

      it('passing IMenuGroups should create a new form with FormGroup', () => {
        const formGroup = service.createMenuGroupsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactId: expect.any(Object),
            name: expect.any(Object),
            cost: expect.any(Object),
            salesPrice: expect.any(Object),
            explanation: expect.any(Object),
            goal: expect.any(Object),
            bodyType: expect.any(Object),
            activityLevelMin: expect.any(Object),
            activityLevelMax: expect.any(Object),
            weightMin: expect.any(Object),
            weightMax: expect.any(Object),
            dailyKcalMin: expect.any(Object),
            dailyKcalMax: expect.any(Object),
            targetWeightMin: expect.any(Object),
            targetWeightMax: expect.any(Object),
            unit: expect.any(Object),
            createdDate: expect.any(Object),
            ingradients: expect.any(Object),
            menus: expect.any(Object),
            imagesUrls: expect.any(Object),
            nutriens: expect.any(Object),
          })
        );
      });
    });

    describe('getMenuGroups', () => {
      it('should return NewMenuGroups for default MenuGroups initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMenuGroupsFormGroup(sampleWithNewData);

        const menuGroups = service.getMenuGroups(formGroup) as any;

        expect(menuGroups).toMatchObject(sampleWithNewData);
      });

      it('should return NewMenuGroups for empty MenuGroups initial value', () => {
        const formGroup = service.createMenuGroupsFormGroup();

        const menuGroups = service.getMenuGroups(formGroup) as any;

        expect(menuGroups).toMatchObject({});
      });

      it('should return IMenuGroups', () => {
        const formGroup = service.createMenuGroupsFormGroup(sampleWithRequiredData);

        const menuGroups = service.getMenuGroups(formGroup) as any;

        expect(menuGroups).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMenuGroups should not enable id FormControl', () => {
        const formGroup = service.createMenuGroupsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMenuGroups should disable id FormControl', () => {
        const formGroup = service.createMenuGroupsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
