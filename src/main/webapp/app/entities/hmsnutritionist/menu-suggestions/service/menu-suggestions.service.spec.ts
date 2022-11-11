import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMenuSuggestions } from '../menu-suggestions.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../menu-suggestions.test-samples';

import { MenuSuggestionsService, RestMenuSuggestions } from './menu-suggestions.service';

const requireRestSample: RestMenuSuggestions = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('MenuSuggestions Service', () => {
  let service: MenuSuggestionsService;
  let httpMock: HttpTestingController;
  let expectedResult: IMenuSuggestions | IMenuSuggestions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MenuSuggestionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a MenuSuggestions', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const menuSuggestions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(menuSuggestions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MenuSuggestions', () => {
      const menuSuggestions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(menuSuggestions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MenuSuggestions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MenuSuggestions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MenuSuggestions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMenuSuggestionsToCollectionIfMissing', () => {
      it('should add a MenuSuggestions to an empty array', () => {
        const menuSuggestions: IMenuSuggestions = sampleWithRequiredData;
        expectedResult = service.addMenuSuggestionsToCollectionIfMissing([], menuSuggestions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menuSuggestions);
      });

      it('should not add a MenuSuggestions to an array that contains it', () => {
        const menuSuggestions: IMenuSuggestions = sampleWithRequiredData;
        const menuSuggestionsCollection: IMenuSuggestions[] = [
          {
            ...menuSuggestions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMenuSuggestionsToCollectionIfMissing(menuSuggestionsCollection, menuSuggestions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MenuSuggestions to an array that doesn't contain it", () => {
        const menuSuggestions: IMenuSuggestions = sampleWithRequiredData;
        const menuSuggestionsCollection: IMenuSuggestions[] = [sampleWithPartialData];
        expectedResult = service.addMenuSuggestionsToCollectionIfMissing(menuSuggestionsCollection, menuSuggestions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menuSuggestions);
      });

      it('should add only unique MenuSuggestions to an array', () => {
        const menuSuggestionsArray: IMenuSuggestions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const menuSuggestionsCollection: IMenuSuggestions[] = [sampleWithRequiredData];
        expectedResult = service.addMenuSuggestionsToCollectionIfMissing(menuSuggestionsCollection, ...menuSuggestionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const menuSuggestions: IMenuSuggestions = sampleWithRequiredData;
        const menuSuggestions2: IMenuSuggestions = sampleWithPartialData;
        expectedResult = service.addMenuSuggestionsToCollectionIfMissing([], menuSuggestions, menuSuggestions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menuSuggestions);
        expect(expectedResult).toContain(menuSuggestions2);
      });

      it('should accept null and undefined values', () => {
        const menuSuggestions: IMenuSuggestions = sampleWithRequiredData;
        expectedResult = service.addMenuSuggestionsToCollectionIfMissing([], null, menuSuggestions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menuSuggestions);
      });

      it('should return initial array if no MenuSuggestions is added', () => {
        const menuSuggestionsCollection: IMenuSuggestions[] = [sampleWithRequiredData];
        expectedResult = service.addMenuSuggestionsToCollectionIfMissing(menuSuggestionsCollection, undefined, null);
        expect(expectedResult).toEqual(menuSuggestionsCollection);
      });
    });

    describe('compareMenuSuggestions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMenuSuggestions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMenuSuggestions(entity1, entity2);
        const compareResult2 = service.compareMenuSuggestions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMenuSuggestions(entity1, entity2);
        const compareResult2 = service.compareMenuSuggestions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMenuSuggestions(entity1, entity2);
        const compareResult2 = service.compareMenuSuggestions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
