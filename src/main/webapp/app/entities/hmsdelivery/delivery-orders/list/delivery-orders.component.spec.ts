import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DeliveryOrdersService } from '../service/delivery-orders.service';

import { DeliveryOrdersComponent } from './delivery-orders.component';

describe('DeliveryOrders Management Component', () => {
  let comp: DeliveryOrdersComponent;
  let fixture: ComponentFixture<DeliveryOrdersComponent>;
  let service: DeliveryOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'delivery-orders', component: DeliveryOrdersComponent }]), HttpClientTestingModule],
      declarations: [DeliveryOrdersComponent],
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
      .overrideTemplate(DeliveryOrdersComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrdersComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DeliveryOrdersService);

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
    expect(comp.deliveryOrders?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to deliveryOrdersService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDeliveryOrdersIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDeliveryOrdersIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
