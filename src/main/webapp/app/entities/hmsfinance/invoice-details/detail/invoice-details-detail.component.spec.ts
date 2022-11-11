import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InvoiceDetailsDetailComponent } from './invoice-details-detail.component';

describe('InvoiceDetails Management Detail Component', () => {
  let comp: InvoiceDetailsDetailComponent;
  let fixture: ComponentFixture<InvoiceDetailsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceDetailsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ invoiceDetails: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InvoiceDetailsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InvoiceDetailsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load invoiceDetails on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.invoiceDetails).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
