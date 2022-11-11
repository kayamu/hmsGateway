import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CookTransactionsDetailComponent } from './cook-transactions-detail.component';

describe('CookTransactions Management Detail Component', () => {
  let comp: CookTransactionsDetailComponent;
  let fixture: ComponentFixture<CookTransactionsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookTransactionsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cookTransactions: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CookTransactionsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CookTransactionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cookTransactions on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cookTransactions).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
