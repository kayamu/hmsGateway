import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ImagesUrlFormService } from './images-url-form.service';
import { ImagesUrlService } from '../service/images-url.service';
import { IImagesUrl } from '../images-url.model';

import { ImagesUrlUpdateComponent } from './images-url-update.component';

describe('ImagesUrl Management Update Component', () => {
  let comp: ImagesUrlUpdateComponent;
  let fixture: ComponentFixture<ImagesUrlUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let imagesUrlFormService: ImagesUrlFormService;
  let imagesUrlService: ImagesUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ImagesUrlUpdateComponent],
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
      .overrideTemplate(ImagesUrlUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ImagesUrlUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    imagesUrlFormService = TestBed.inject(ImagesUrlFormService);
    imagesUrlService = TestBed.inject(ImagesUrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const imagesUrl: IImagesUrl = { id: 456 };

      activatedRoute.data = of({ imagesUrl });
      comp.ngOnInit();

      expect(comp.imagesUrl).toEqual(imagesUrl);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImagesUrl>>();
      const imagesUrl = { id: 123 };
      jest.spyOn(imagesUrlFormService, 'getImagesUrl').mockReturnValue(imagesUrl);
      jest.spyOn(imagesUrlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ imagesUrl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: imagesUrl }));
      saveSubject.complete();

      // THEN
      expect(imagesUrlFormService.getImagesUrl).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(imagesUrlService.update).toHaveBeenCalledWith(expect.objectContaining(imagesUrl));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImagesUrl>>();
      const imagesUrl = { id: 123 };
      jest.spyOn(imagesUrlFormService, 'getImagesUrl').mockReturnValue({ id: null });
      jest.spyOn(imagesUrlService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ imagesUrl: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: imagesUrl }));
      saveSubject.complete();

      // THEN
      expect(imagesUrlFormService.getImagesUrl).toHaveBeenCalled();
      expect(imagesUrlService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImagesUrl>>();
      const imagesUrl = { id: 123 };
      jest.spyOn(imagesUrlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ imagesUrl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(imagesUrlService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
