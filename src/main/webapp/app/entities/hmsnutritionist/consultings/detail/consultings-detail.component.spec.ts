import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultingsDetailComponent } from './consultings-detail.component';

describe('Consultings Management Detail Component', () => {
  let comp: ConsultingsDetailComponent;
  let fixture: ComponentFixture<ConsultingsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultingsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ consultings: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConsultingsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConsultingsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load consultings on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.consultings).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
