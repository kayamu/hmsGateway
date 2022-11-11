import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CustomerHealthsFormService } from './customer-healths-form.service';
import { CustomerHealthsService } from '../service/customer-healths.service';
import { ICustomerHealths } from '../customer-healths.model';
import { IAllergens } from 'app/entities/hmscustomer/allergens/allergens.model';
import { AllergensService } from 'app/entities/hmscustomer/allergens/service/allergens.service';

import { CustomerHealthsUpdateComponent } from './customer-healths-update.component';

describe('CustomerHealths Management Update Component', () => {
  let comp: CustomerHealthsUpdateComponent;
  let fixture: ComponentFixture<CustomerHealthsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customerHealthsFormService: CustomerHealthsFormService;
  let customerHealthsService: CustomerHealthsService;
  let allergensService: AllergensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CustomerHealthsUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CustomerHealthsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerHealthsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerHealthsFormService = TestBed.inject(CustomerHealthsFormService);
    customerHealthsService = TestBed.inject(CustomerHealthsService);
    allergensService = TestBed.inject(AllergensService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Allergens query and add missing value', () => {
      const customerHealths: ICustomerHealths = { id: 456 };
      const allergens: IAllergens[] = [{ id: 59447 }];
      customerHealths.allergens = allergens;

      const allergensCollection: IAllergens[] = [{ id: 17208 }];
      jest.spyOn(allergensService, 'query').mockReturnValue(of(new HttpResponse({ body: allergensCollection })));
      const additionalAllergens = [...allergens];
      const expectedCollection: IAllergens[] = [...additionalAllergens, ...allergensCollection];
      jest.spyOn(allergensService, 'addAllergensToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ customerHealths });
      comp.ngOnInit();

      expect(allergensService.query).toHaveBeenCalled();
      expect(allergensService.addAllergensToCollectionIfMissing).toHaveBeenCalledWith(
        allergensCollection,
        ...additionalAllergens.map(expect.objectContaining)
      );
      expect(comp.allergensSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const customerHealths: ICustomerHealths = { id: 456 };
      const allergens: IAllergens = { id: 81618 };
      customerHealths.allergens = [allergens];

      activatedRoute.data = of({ customerHealths });
      comp.ngOnInit();

      expect(comp.allergensSharedCollection).toContain(allergens);
      expect(comp.customerHealths).toEqual(customerHealths);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerHealths>>();
      const customerHealths = { id: 123 };
      jest.spyOn(customerHealthsFormService, 'getCustomerHealths').mockReturnValue(customerHealths);
      jest.spyOn(customerHealthsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerHealths });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerHealths }));
      saveSubject.complete();

      // THEN
      expect(customerHealthsFormService.getCustomerHealths).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customerHealthsService.update).toHaveBeenCalledWith(expect.objectContaining(customerHealths));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerHealths>>();
      const customerHealths = { id: 123 };
      jest.spyOn(customerHealthsFormService, 'getCustomerHealths').mockReturnValue({ id: null });
      jest.spyOn(customerHealthsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerHealths: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerHealths }));
      saveSubject.complete();

      // THEN
      expect(customerHealthsFormService.getCustomerHealths).toHaveBeenCalled();
      expect(customerHealthsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerHealths>>();
      const customerHealths = { id: 123 };
      jest.spyOn(customerHealthsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerHealths });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customerHealthsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAllergens', () => {
      it('Should forward to allergensService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(allergensService, 'compareAllergens');
        comp.compareAllergens(entity, entity2);
        expect(allergensService.compareAllergens).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
