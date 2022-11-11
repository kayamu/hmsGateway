import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AllergensDetailComponent } from './allergens-detail.component';

describe('Allergens Management Detail Component', () => {
  let comp: AllergensDetailComponent;
  let fixture: ComponentFixture<AllergensDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergensDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ allergens: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AllergensDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AllergensDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load allergens on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.allergens).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
