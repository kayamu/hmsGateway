import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../menu-suggestions.test-samples';

import { MenuSuggestionsFormService } from './menu-suggestions-form.service';

describe('MenuSuggestions Form Service', () => {
  let service: MenuSuggestionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSuggestionsFormService);
  });

  describe('Service methods', () => {
    describe('createMenuSuggestionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMenuSuggestionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nutritionistId: expect.any(Object),
            customerId: expect.any(Object),
            menuGroupId: expect.any(Object),
            notes: expect.any(Object),
            createdDate: expect.any(Object),
            consultings: expect.any(Object),
          })
        );
      });

      it('passing IMenuSuggestions should create a new form with FormGroup', () => {
        const formGroup = service.createMenuSuggestionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nutritionistId: expect.any(Object),
            customerId: expect.any(Object),
            menuGroupId: expect.any(Object),
            notes: expect.any(Object),
            createdDate: expect.any(Object),
            consultings: expect.any(Object),
          })
        );
      });
    });

    describe('getMenuSuggestions', () => {
      it('should return NewMenuSuggestions for default MenuSuggestions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMenuSuggestionsFormGroup(sampleWithNewData);

        const menuSuggestions = service.getMenuSuggestions(formGroup) as any;

        expect(menuSuggestions).toMatchObject(sampleWithNewData);
      });

      it('should return NewMenuSuggestions for empty MenuSuggestions initial value', () => {
        const formGroup = service.createMenuSuggestionsFormGroup();

        const menuSuggestions = service.getMenuSuggestions(formGroup) as any;

        expect(menuSuggestions).toMatchObject({});
      });

      it('should return IMenuSuggestions', () => {
        const formGroup = service.createMenuSuggestionsFormGroup(sampleWithRequiredData);

        const menuSuggestions = service.getMenuSuggestions(formGroup) as any;

        expect(menuSuggestions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMenuSuggestions should not enable id FormControl', () => {
        const formGroup = service.createMenuSuggestionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMenuSuggestions should disable id FormControl', () => {
        const formGroup = service.createMenuSuggestionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
