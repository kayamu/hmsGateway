import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MealIngredientsDetailComponent } from './meal-ingredients-detail.component';

describe('MealIngredients Management Detail Component', () => {
  let comp: MealIngredientsDetailComponent;
  let fixture: ComponentFixture<MealIngredientsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealIngredientsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ mealIngredients: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MealIngredientsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MealIngredientsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load mealIngredients on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.mealIngredients).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
