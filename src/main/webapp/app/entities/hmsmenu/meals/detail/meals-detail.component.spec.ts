import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MealsDetailComponent } from './meals-detail.component';

describe('Meals Management Detail Component', () => {
  let comp: MealsDetailComponent;
  let fixture: ComponentFixture<MealsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ meals: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MealsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MealsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load meals on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.meals).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
