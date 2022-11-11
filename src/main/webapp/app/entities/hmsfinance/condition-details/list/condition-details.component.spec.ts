import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConditionDetailsService } from '../service/condition-details.service';

import { ConditionDetailsComponent } from './condition-details.component';

describe('ConditionDetails Management Component', () => {
  let comp: ConditionDetailsComponent;
  let fixture: ComponentFixture<ConditionDetailsComponent>;
  let service: ConditionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'condition-details', component: ConditionDetailsComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ConditionDetailsComponent],
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
      .overrideTemplate(ConditionDetailsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConditionDetailsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConditionDetailsService);

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
    expect(comp.conditionDetails?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to conditionDetailsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConditionDetailsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConditionDetailsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
