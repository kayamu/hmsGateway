import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IngredientsService } from '../service/ingredients.service';

import { IngredientsComponent } from './ingredients.component';

describe('Ingredients Management Component', () => {
  let comp: IngredientsComponent;
  let fixture: ComponentFixture<IngredientsComponent>;
  let service: IngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'ingredients', component: IngredientsComponent }]), HttpClientTestingModule],
      declarations: [IngredientsComponent],
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
      .overrideTemplate(IngredientsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IngredientsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(IngredientsService);

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
    expect(comp.ingredients?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ingredientsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getIngredientsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getIngredientsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
