import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultingStatusDetailComponent } from './consulting-status-detail.component';

describe('ConsultingStatus Management Detail Component', () => {
  let comp: ConsultingStatusDetailComponent;
  let fixture: ComponentFixture<ConsultingStatusDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultingStatusDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ consultingStatus: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConsultingStatusDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConsultingStatusDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load consultingStatus on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.consultingStatus).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
