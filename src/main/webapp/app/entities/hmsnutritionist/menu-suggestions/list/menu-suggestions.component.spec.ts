import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MenuSuggestionsService } from '../service/menu-suggestions.service';

import { MenuSuggestionsComponent } from './menu-suggestions.component';

describe('MenuSuggestions Management Component', () => {
  let comp: MenuSuggestionsComponent;
  let fixture: ComponentFixture<MenuSuggestionsComponent>;
  let service: MenuSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'menu-suggestions', component: MenuSuggestionsComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [MenuSuggestionsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(MenuSuggestionsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MenuSuggestionsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MenuSuggestionsService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.menuSuggestions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to menuSuggestionsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMenuSuggestionsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMenuSuggestionsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
