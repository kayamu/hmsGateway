import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubItemsDetailComponent } from './sub-items-detail.component';

describe('SubItems Management Detail Component', () => {
  let comp: SubItemsDetailComponent;
  let fixture: ComponentFixture<SubItemsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubItemsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ subItems: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SubItemsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SubItemsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load subItems on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.subItems).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
