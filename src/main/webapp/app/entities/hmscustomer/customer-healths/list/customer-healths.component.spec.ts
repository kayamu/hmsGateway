import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CustomerHealthsService } from '../service/customer-healths.service';

import { CustomerHealthsComponent } from './customer-healths.component';

describe('CustomerHealths Management Component', () => {
  let comp: CustomerHealthsComponent;
  let fixture: ComponentFixture<CustomerHealthsComponent>;
  let service: CustomerHealthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'customer-healths', component: CustomerHealthsComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [CustomerHealthsComponent],
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
      .overrideTemplate(CustomerHealthsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerHealthsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CustomerHealthsService);

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
    expect(comp.customerHealths?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to customerHealthsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCustomerHealthsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCustomerHealthsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
