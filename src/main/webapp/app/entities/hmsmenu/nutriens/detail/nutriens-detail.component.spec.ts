import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NutriensDetailComponent } from './nutriens-detail.component';

describe('Nutriens Management Detail Component', () => {
  let comp: NutriensDetailComponent;
  let fixture: ComponentFixture<NutriensDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutriensDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nutriens: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NutriensDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NutriensDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nutriens on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nutriens).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
