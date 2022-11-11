import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TemplatesDetailComponent } from './templates-detail.component';

describe('Templates Management Detail Component', () => {
  let comp: TemplatesDetailComponent;
  let fixture: ComponentFixture<TemplatesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplatesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ templates: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TemplatesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TemplatesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load templates on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.templates).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
