import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CustomerHealthsDetailComponent } from './customer-healths-detail.component';

describe('CustomerHealths Management Detail Component', () => {
  let comp: CustomerHealthsDetailComponent;
  let fixture: ComponentFixture<CustomerHealthsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerHealthsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ customerHealths: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CustomerHealthsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CustomerHealthsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load customerHealths on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.customerHealths).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
