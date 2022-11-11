import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MealIngredientsService } from '../service/meal-ingredients.service';

import { MealIngredientsComponent } from './meal-ingredients.component';

describe('MealIngredients Management Component', () => {
  let comp: MealIngredientsComponent;
  let fixture: ComponentFixture<MealIngredientsComponent>;
  let service: MealIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'meal-ingredients', component: MealIngredientsComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [MealIngredientsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(MealIngredientsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MealIngredientsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MealIngredientsService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.mealIngredients?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to mealIngredientsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMealIngredientsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMealIngredientsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
