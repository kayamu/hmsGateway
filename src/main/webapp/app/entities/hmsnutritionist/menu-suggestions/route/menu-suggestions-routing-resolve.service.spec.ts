import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMenuSuggestions } from '../menu-suggestions.model';
import { MenuSuggestionsService } from '../service/menu-suggestions.service';

import { MenuSuggestionsRoutingResolveService } from './menu-suggestions-routing-resolve.service';

describe('MenuSuggestions routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MenuSuggestionsRoutingResolveService;
  let service: MenuSuggestionsService;
  let resultMenuSuggestions: IMenuSuggestions | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(MenuSuggestionsRoutingResolveService);
    service = TestBed.inject(MenuSuggestionsService);
    resultMenuSuggestions = undefined;
  });

  describe('resolve', () => {
    it('should return IMenuSuggestions returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMenuSuggestions = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMenuSuggestions).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMenuSuggestions = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMenuSuggestions).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IMenuSuggestions>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMenuSuggestions = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMenuSuggestions).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
