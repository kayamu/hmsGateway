import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConditionsService } from '../service/conditions.service';

import { ConditionsComponent } from './conditions.component';

describe('Conditions Management Component', () => {
  let comp: ConditionsComponent;
  let fixture: ComponentFixture<ConditionsComponent>;
  let service: ConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'conditions', component: ConditionsComponent }]), HttpClientTestingModule],
      declarations: [ConditionsComponent],
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
      .overrideTemplate(ConditionsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConditionsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConditionsService);

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
    expect(comp.conditions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to conditionsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConditionsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConditionsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
