import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EpicrysisDetailComponent } from './epicrysis-detail.component';

describe('Epicrysis Management Detail Component', () => {
  let comp: EpicrysisDetailComponent;
  let fixture: ComponentFixture<EpicrysisDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicrysisDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ epicrysis: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EpicrysisDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EpicrysisDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load epicrysis on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.epicrysis).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
