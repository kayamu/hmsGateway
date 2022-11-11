import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMealIngredients } from '../meal-ingredients.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../meal-ingredients.test-samples';

import { MealIngredientsService, RestMealIngredients } from './meal-ingredients.service';

const requireRestSample: RestMealIngredients = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('MealIngredients Service', () => {
  let service: MealIngredientsService;
  let httpMock: HttpTestingController;
  let expectedResult: IMealIngredients | IMealIngredients[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MealIngredientsService);
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

    it('should create a MealIngredients', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mealIngredients = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(mealIngredients).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MealIngredients', () => {
      const mealIngredients = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(mealIngredients).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MealIngredients', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MealIngredients', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MealIngredients', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMealIngredientsToCollectionIfMissing', () => {
      it('should add a MealIngredients to an empty array', () => {
        const mealIngredients: IMealIngredients = sampleWithRequiredData;
        expectedResult = service.addMealIngredientsToCollectionIfMissing([], mealIngredients);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mealIngredients);
      });

      it('should not add a MealIngredients to an array that contains it', () => {
        const mealIngredients: IMealIngredients = sampleWithRequiredData;
        const mealIngredientsCollection: IMealIngredients[] = [
          {
            ...mealIngredients,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMealIngredientsToCollectionIfMissing(mealIngredientsCollection, mealIngredients);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MealIngredients to an array that doesn't contain it", () => {
        const mealIngredients: IMealIngredients = sampleWithRequiredData;
        const mealIngredientsCollection: IMealIngredients[] = [sampleWithPartialData];
        expectedResult = service.addMealIngredientsToCollectionIfMissing(mealIngredientsCollection, mealIngredients);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mealIngredients);
      });

      it('should add only unique MealIngredients to an array', () => {
        const mealIngredientsArray: IMealIngredients[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const mealIngredientsCollection: IMealIngredients[] = [sampleWithRequiredData];
        expectedResult = service.addMealIngredientsToCollectionIfMissing(mealIngredientsCollection, ...mealIngredientsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const mealIngredients: IMealIngredients = sampleWithRequiredData;
        const mealIngredients2: IMealIngredients = sampleWithPartialData;
        expectedResult = service.addMealIngredientsToCollectionIfMissing([], mealIngredients, mealIngredients2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mealIngredients);
        expect(expectedResult).toContain(mealIngredients2);
      });

      it('should accept null and undefined values', () => {
        const mealIngredients: IMealIngredients = sampleWithRequiredData;
        expectedResult = service.addMealIngredientsToCollectionIfMissing([], null, mealIngredients, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mealIngredients);
      });

      it('should return initial array if no MealIngredients is added', () => {
        const mealIngredientsCollection: IMealIngredients[] = [sampleWithRequiredData];
        expectedResult = service.addMealIngredientsToCollectionIfMissing(mealIngredientsCollection, undefined, null);
        expect(expectedResult).toEqual(mealIngredientsCollection);
      });
    });

    describe('compareMealIngredients', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMealIngredients(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMealIngredients(entity1, entity2);
        const compareResult2 = service.compareMealIngredients(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMealIngredients(entity1, entity2);
        const compareResult2 = service.compareMealIngredients(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMealIngredients(entity1, entity2);
        const compareResult2 = service.compareMealIngredients(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
