import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeliveryOrdersDetailComponent } from './delivery-orders-detail.component';

describe('DeliveryOrders Management Detail Component', () => {
  let comp: DeliveryOrdersDetailComponent;
  let fixture: ComponentFixture<DeliveryOrdersDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryOrdersDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ deliveryOrders: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DeliveryOrdersDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DeliveryOrdersDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load deliveryOrders on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.deliveryOrders).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
