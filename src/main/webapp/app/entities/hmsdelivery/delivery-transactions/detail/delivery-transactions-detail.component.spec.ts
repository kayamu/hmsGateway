import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeliveryTransactionsDetailComponent } from './delivery-transactions-detail.component';

describe('DeliveryTransactions Management Detail Component', () => {
  let comp: DeliveryTransactionsDetailComponent;
  let fixture: ComponentFixture<DeliveryTransactionsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryTransactionsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ deliveryTransactions: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DeliveryTransactionsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DeliveryTransactionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load deliveryTransactions on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.deliveryTransactions).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
