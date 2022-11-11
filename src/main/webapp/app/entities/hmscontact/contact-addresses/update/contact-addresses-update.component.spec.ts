import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContactAddressesFormService } from './contact-addresses-form.service';
import { ContactAddressesService } from '../service/contact-addresses.service';
import { IContactAddresses } from '../contact-addresses.model';

import { ContactAddressesUpdateComponent } from './contact-addresses-update.component';

describe('ContactAddresses Management Update Component', () => {
  let comp: ContactAddressesUpdateComponent;
  let fixture: ComponentFixture<ContactAddressesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contactAddressesFormService: ContactAddressesFormService;
  let contactAddressesService: ContactAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContactAddressesUpdateComponent],
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
      .overrideTemplate(ContactAddressesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContactAddressesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contactAddressesFormService = TestBed.inject(ContactAddressesFormService);
    contactAddressesService = TestBed.inject(ContactAddressesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const contactAddresses: IContactAddresses = { id: 456 };

      activatedRoute.data = of({ contactAddresses });
      comp.ngOnInit();

      expect(comp.contactAddresses).toEqual(contactAddresses);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactAddresses>>();
      const contactAddresses = { id: 123 };
      jest.spyOn(contactAddressesFormService, 'getContactAddresses').mockReturnValue(contactAddresses);
      jest.spyOn(contactAddressesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactAddresses });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contactAddresses }));
      saveSubject.complete();

      // THEN
      expect(contactAddressesFormService.getContactAddresses).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contactAddressesService.update).toHaveBeenCalledWith(expect.objectContaining(contactAddresses));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactAddresses>>();
      const contactAddresses = { id: 123 };
      jest.spyOn(contactAddressesFormService, 'getContactAddresses').mockReturnValue({ id: null });
      jest.spyOn(contactAddressesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactAddresses: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contactAddresses }));
      saveSubject.complete();

      // THEN
      expect(contactAddressesFormService.getContactAddresses).toHaveBeenCalled();
      expect(contactAddressesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactAddresses>>();
      const contactAddresses = { id: 123 };
      jest.spyOn(contactAddressesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactAddresses });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contactAddressesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
