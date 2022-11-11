import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConsultingStatusService } from '../service/consulting-status.service';

import { ConsultingStatusComponent } from './consulting-status.component';

describe('ConsultingStatus Management Component', () => {
  let comp: ConsultingStatusComponent;
  let fixture: ComponentFixture<ConsultingStatusComponent>;
  let service: ConsultingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'consulting-status', component: ConsultingStatusComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ConsultingStatusComponent],
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
      .overrideTemplate(ConsultingStatusComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsultingStatusComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConsultingStatusService);

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
    expect(comp.consultingStatuses?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to consultingStatusService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConsultingStatusIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConsultingStatusIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
