import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MenusDetailComponent } from './menus-detail.component';

describe('Menus Management Detail Component', () => {
  let comp: MenusDetailComponent;
  let fixture: ComponentFixture<MenusDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenusDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ menus: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MenusDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MenusDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load menus on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.menus).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
