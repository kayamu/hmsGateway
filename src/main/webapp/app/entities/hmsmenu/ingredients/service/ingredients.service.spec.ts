import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IIngredients } from '../ingredients.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ingredients.test-samples';

import { IngredientsService, RestIngredients } from './ingredients.service';

const requireRestSample: RestIngredients = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Ingredients Service', () => {
  let service: IngredientsService;
  let httpMock: HttpTestingController;
  let expectedResult: IIngredients | IIngredients[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IngredientsService);
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

    it('should create a Ingredients', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ingredients = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ingredients).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ingredients', () => {
      const ingredients = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ingredients).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ingredients', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ingredients', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ingredients', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addIngredientsToCollectionIfMissing', () => {
      it('should add a Ingredients to an empty array', () => {
        const ingredients: IIngredients = sampleWithRequiredData;
        expectedResult = service.addIngredientsToCollectionIfMissing([], ingredients);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ingredients);
      });

      it('should not add a Ingredients to an array that contains it', () => {
        const ingredients: IIngredients = sampleWithRequiredData;
        const ingredientsCollection: IIngredients[] = [
          {
            ...ingredients,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addIngredientsToCollectionIfMissing(ingredientsCollection, ingredients);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ingredients to an array that doesn't contain it", () => {
        const ingredients: IIngredients = sampleWithRequiredData;
        const ingredientsCollection: IIngredients[] = [sampleWithPartialData];
        expectedResult = service.addIngredientsToCollectionIfMissing(ingredientsCollection, ingredients);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ingredients);
      });

      it('should add only unique Ingredients to an array', () => {
        const ingredientsArray: IIngredients[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ingredientsCollection: IIngredients[] = [sampleWithRequiredData];
        expectedResult = service.addIngredientsToCollectionIfMissing(ingredientsCollection, ...ingredientsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ingredients: IIngredients = sampleWithRequiredData;
        const ingredients2: IIngredients = sampleWithPartialData;
        expectedResult = service.addIngredientsToCollectionIfMissing([], ingredients, ingredients2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ingredients);
        expect(expectedResult).toContain(ingredients2);
      });

      it('should accept null and undefined values', () => {
        const ingredients: IIngredients = sampleWithRequiredData;
        expectedResult = service.addIngredientsToCollectionIfMissing([], null, ingredients, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ingredients);
      });

      it('should return initial array if no Ingredients is added', () => {
        const ingredientsCollection: IIngredients[] = [sampleWithRequiredData];
        expectedResult = service.addIngredientsToCollectionIfMissing(ingredientsCollection, undefined, null);
        expect(expectedResult).toEqual(ingredientsCollection);
      });
    });

    describe('compareIngredients', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareIngredients(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareIngredients(entity1, entity2);
        const compareResult2 = service.compareIngredients(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareIngredients(entity1, entity2);
        const compareResult2 = service.compareIngredients(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareIngredients(entity1, entity2);
        const compareResult2 = service.compareIngredients(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
