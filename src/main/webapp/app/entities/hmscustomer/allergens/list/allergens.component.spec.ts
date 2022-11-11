import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AllergensService } from '../service/allergens.service';

import { AllergensComponent } from './allergens.component';

describe('Allergens Management Component', () => {
  let comp: AllergensComponent;
  let fixture: ComponentFixture<AllergensComponent>;
  let service: AllergensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'allergens', component: AllergensComponent }]), HttpClientTestingModule],
      declarations: [AllergensComponent],
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
      .overrideTemplate(AllergensComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AllergensComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AllergensService);

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
    expect(comp.allergens?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to allergensService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAllergensIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAllergensIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
