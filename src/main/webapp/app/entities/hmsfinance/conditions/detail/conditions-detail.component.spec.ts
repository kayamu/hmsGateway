import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConditionsDetailComponent } from './conditions-detail.component';

describe('Conditions Management Detail Component', () => {
  let comp: ConditionsDetailComponent;
  let fixture: ComponentFixture<ConditionsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ conditions: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConditionsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConditionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load conditions on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.conditions).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
