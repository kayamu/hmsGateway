import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMeals } from '../meals.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../meals.test-samples';

import { MealsService, RestMeals } from './meals.service';

const requireRestSample: RestMeals = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Meals Service', () => {
  let service: MealsService;
  let httpMock: HttpTestingController;
  let expectedResult: IMeals | IMeals[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MealsService);
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

    it('should create a Meals', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const meals = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(meals).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Meals', () => {
      const meals = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(meals).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Meals', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Meals', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Meals', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMealsToCollectionIfMissing', () => {
      it('should add a Meals to an empty array', () => {
        const meals: IMeals = sampleWithRequiredData;
        expectedResult = service.addMealsToCollectionIfMissing([], meals);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(meals);
      });

      it('should not add a Meals to an array that contains it', () => {
        const meals: IMeals = sampleWithRequiredData;
        const mealsCollection: IMeals[] = [
          {
            ...meals,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMealsToCollectionIfMissing(mealsCollection, meals);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Meals to an array that doesn't contain it", () => {
        const meals: IMeals = sampleWithRequiredData;
        const mealsCollection: IMeals[] = [sampleWithPartialData];
        expectedResult = service.addMealsToCollectionIfMissing(mealsCollection, meals);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(meals);
      });

      it('should add only unique Meals to an array', () => {
        const mealsArray: IMeals[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const mealsCollection: IMeals[] = [sampleWithRequiredData];
        expectedResult = service.addMealsToCollectionIfMissing(mealsCollection, ...mealsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const meals: IMeals = sampleWithRequiredData;
        const meals2: IMeals = sampleWithPartialData;
        expectedResult = service.addMealsToCollectionIfMissing([], meals, meals2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(meals);
        expect(expectedResult).toContain(meals2);
      });

      it('should accept null and undefined values', () => {
        const meals: IMeals = sampleWithRequiredData;
        expectedResult = service.addMealsToCollectionIfMissing([], null, meals, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(meals);
      });

      it('should return initial array if no Meals is added', () => {
        const mealsCollection: IMeals[] = [sampleWithRequiredData];
        expectedResult = service.addMealsToCollectionIfMissing(mealsCollection, undefined, null);
        expect(expectedResult).toEqual(mealsCollection);
      });
    });

    describe('compareMeals', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMeals(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMeals(entity1, entity2);
        const compareResult2 = service.compareMeals(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMeals(entity1, entity2);
        const compareResult2 = service.compareMeals(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMeals(entity1, entity2);
        const compareResult2 = service.compareMeals(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
