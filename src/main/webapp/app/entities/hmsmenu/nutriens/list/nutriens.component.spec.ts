import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NutriensService } from '../service/nutriens.service';

import { NutriensComponent } from './nutriens.component';

describe('Nutriens Management Component', () => {
  let comp: NutriensComponent;
  let fixture: ComponentFixture<NutriensComponent>;
  let service: NutriensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'nutriens', component: NutriensComponent }]), HttpClientTestingModule],
      declarations: [NutriensComponent],
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
      .overrideTemplate(NutriensComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NutriensComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NutriensService);

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
    expect(comp.nutriens?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to nutriensService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getNutriensIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getNutriensIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
