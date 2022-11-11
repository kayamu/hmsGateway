import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MenuGroupsDetailComponent } from './menu-groups-detail.component';

describe('MenuGroups Management Detail Component', () => {
  let comp: MenuGroupsDetailComponent;
  let fixture: ComponentFixture<MenuGroupsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuGroupsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ menuGroups: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MenuGroupsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MenuGroupsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load menuGroups on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.menuGroups).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
