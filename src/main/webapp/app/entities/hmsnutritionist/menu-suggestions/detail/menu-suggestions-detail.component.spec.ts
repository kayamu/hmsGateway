import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MenuSuggestionsDetailComponent } from './menu-suggestions-detail.component';

describe('MenuSuggestions Management Detail Component', () => {
  let comp: MenuSuggestionsDetailComponent;
  let fixture: ComponentFixture<MenuSuggestionsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuSuggestionsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ menuSuggestions: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MenuSuggestionsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MenuSuggestionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load menuSuggestions on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.menuSuggestions).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
