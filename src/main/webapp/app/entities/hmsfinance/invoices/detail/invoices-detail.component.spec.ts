import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InvoicesDetailComponent } from './invoices-detail.component';

describe('Invoices Management Detail Component', () => {
  let comp: InvoicesDetailComponent;
  let fixture: ComponentFixture<InvoicesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ invoices: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InvoicesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InvoicesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load invoices on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.invoices).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
