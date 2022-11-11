import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentsDetailComponent } from './payments-detail.component';

describe('Payments Management Detail Component', () => {
  let comp: PaymentsDetailComponent;
  let fixture: ComponentFixture<PaymentsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ payments: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PaymentsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PaymentsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load payments on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.payments).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
