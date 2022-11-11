import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InvoiceTransactionsDetailComponent } from './invoice-transactions-detail.component';

describe('InvoiceTransactions Management Detail Component', () => {
  let comp: InvoiceTransactionsDetailComponent;
  let fixture: ComponentFixture<InvoiceTransactionsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceTransactionsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ invoiceTransactions: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InvoiceTransactionsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InvoiceTransactionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load invoiceTransactions on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.invoiceTransactions).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
