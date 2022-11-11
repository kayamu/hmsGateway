import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { INutriens } from '../nutriens.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../nutriens.test-samples';

import { NutriensService, RestNutriens } from './nutriens.service';

const requireRestSample: RestNutriens = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Nutriens Service', () => {
  let service: NutriensService;
  let httpMock: HttpTestingController;
  let expectedResult: INutriens | INutriens[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NutriensService);
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

    it('should create a Nutriens', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const nutriens = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(nutriens).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Nutriens', () => {
      const nutriens = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(nutriens).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Nutriens', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Nutriens', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Nutriens', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNutriensToCollectionIfMissing', () => {
      it('should add a Nutriens to an empty array', () => {
        const nutriens: INutriens = sampleWithRequiredData;
        expectedResult = service.addNutriensToCollectionIfMissing([], nutriens);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nutriens);
      });

      it('should not add a Nutriens to an array that contains it', () => {
        const nutriens: INutriens = sampleWithRequiredData;
        const nutriensCollection: INutriens[] = [
          {
            ...nutriens,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNutriensToCollectionIfMissing(nutriensCollection, nutriens);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Nutriens to an array that doesn't contain it", () => {
        const nutriens: INutriens = sampleWithRequiredData;
        const nutriensCollection: INutriens[] = [sampleWithPartialData];
        expectedResult = service.addNutriensToCollectionIfMissing(nutriensCollection, nutriens);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nutriens);
      });

      it('should add only unique Nutriens to an array', () => {
        const nutriensArray: INutriens[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const nutriensCollection: INutriens[] = [sampleWithRequiredData];
        expectedResult = service.addNutriensToCollectionIfMissing(nutriensCollection, ...nutriensArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nutriens: INutriens = sampleWithRequiredData;
        const nutriens2: INutriens = sampleWithPartialData;
        expectedResult = service.addNutriensToCollectionIfMissing([], nutriens, nutriens2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nutriens);
        expect(expectedResult).toContain(nutriens2);
      });

      it('should accept null and undefined values', () => {
        const nutriens: INutriens = sampleWithRequiredData;
        expectedResult = service.addNutriensToCollectionIfMissing([], null, nutriens, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nutriens);
      });

      it('should return initial array if no Nutriens is added', () => {
        const nutriensCollection: INutriens[] = [sampleWithRequiredData];
        expectedResult = service.addNutriensToCollectionIfMissing(nutriensCollection, undefined, null);
        expect(expectedResult).toEqual(nutriensCollection);
      });
    });

    describe('compareNutriens', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNutriens(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNutriens(entity1, entity2);
        const compareResult2 = service.compareNutriens(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNutriens(entity1, entity2);
        const compareResult2 = service.compareNutriens(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNutriens(entity1, entity2);
        const compareResult2 = service.compareNutriens(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
