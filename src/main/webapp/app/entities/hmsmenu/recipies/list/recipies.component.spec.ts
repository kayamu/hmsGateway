import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RecipiesService } from '../service/recipies.service';

import { RecipiesComponent } from './recipies.component';

describe('Recipies Management Component', () => {
  let comp: RecipiesComponent;
  let fixture: ComponentFixture<RecipiesComponent>;
  let service: RecipiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'recipies', component: RecipiesComponent }]), HttpClientTestingModule],
      declarations: [RecipiesComponent],
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
      .overrideTemplate(RecipiesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RecipiesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RecipiesService);

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
    expect(comp.recipies?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to recipiesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getRecipiesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getRecipiesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
