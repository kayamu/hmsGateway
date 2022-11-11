import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ItemsDetailComponent } from './items-detail.component';

describe('Items Management Detail Component', () => {
  let comp: ItemsDetailComponent;
  let fixture: ComponentFixture<ItemsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ items: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ItemsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ItemsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load items on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.items).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
