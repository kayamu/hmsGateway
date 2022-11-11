import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConsultingsService } from '../service/consultings.service';

import { ConsultingsComponent } from './consultings.component';

describe('Consultings Management Component', () => {
  let comp: ConsultingsComponent;
  let fixture: ComponentFixture<ConsultingsComponent>;
  let service: ConsultingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'consultings', component: ConsultingsComponent }]), HttpClientTestingModule],
      declarations: [ConsultingsComponent],
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
      .overrideTemplate(ConsultingsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsultingsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConsultingsService);

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
    expect(comp.consultings?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to consultingsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConsultingsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConsultingsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
