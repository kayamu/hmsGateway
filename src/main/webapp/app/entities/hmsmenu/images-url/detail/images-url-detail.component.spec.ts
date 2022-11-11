import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImagesUrlDetailComponent } from './images-url-detail.component';

describe('ImagesUrl Management Detail Component', () => {
  let comp: ImagesUrlDetailComponent;
  let fixture: ComponentFixture<ImagesUrlDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesUrlDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ imagesUrl: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ImagesUrlDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ImagesUrlDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load imagesUrl on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.imagesUrl).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
