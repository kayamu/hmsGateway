import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConditionDetailsDetailComponent } from './condition-details-detail.component';

describe('ConditionDetails Management Detail Component', () => {
  let comp: ConditionDetailsDetailComponent;
  let fixture: ComponentFixture<ConditionDetailsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionDetailsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ conditionDetails: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConditionDetailsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConditionDetailsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load conditionDetails on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.conditionDetails).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
