import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TemplateItemsDetailComponent } from './template-items-detail.component';

describe('TemplateItems Management Detail Component', () => {
  let comp: TemplateItemsDetailComponent;
  let fixture: ComponentFixture<TemplateItemsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateItemsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ templateItems: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TemplateItemsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TemplateItemsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load templateItems on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.templateItems).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
