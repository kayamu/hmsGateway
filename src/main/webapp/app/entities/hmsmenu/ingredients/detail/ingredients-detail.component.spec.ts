import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IngredientsDetailComponent } from './ingredients-detail.component';

describe('Ingredients Management Detail Component', () => {
  let comp: IngredientsDetailComponent;
  let fixture: ComponentFixture<IngredientsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ingredients: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(IngredientsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(IngredientsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ingredients on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ingredients).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
