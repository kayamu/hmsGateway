import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CookOrdersDetailComponent } from './cook-orders-detail.component';

describe('CookOrders Management Detail Component', () => {
  let comp: CookOrdersDetailComponent;
  let fixture: ComponentFixture<CookOrdersDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookOrdersDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cookOrders: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CookOrdersDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CookOrdersDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cookOrders on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cookOrders).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
