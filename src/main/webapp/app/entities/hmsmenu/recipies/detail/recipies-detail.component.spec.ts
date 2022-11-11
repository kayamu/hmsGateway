import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecipiesDetailComponent } from './recipies-detail.component';

describe('Recipies Management Detail Component', () => {
  let comp: RecipiesDetailComponent;
  let fixture: ComponentFixture<RecipiesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipiesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ recipies: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RecipiesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RecipiesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load recipies on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.recipies).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
