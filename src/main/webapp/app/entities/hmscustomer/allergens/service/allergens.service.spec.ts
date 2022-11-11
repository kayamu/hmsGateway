import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAllergens } from '../allergens.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../allergens.test-samples';

import { AllergensService, RestAllergens } from './allergens.service';

const requireRestSample: RestAllergens = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Allergens Service', () => {
  let service: AllergensService;
  let httpMock: HttpTestingController;
  let expectedResult: IAllergens | IAllergens[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AllergensService);
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

    it('should create a Allergens', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const allergens = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(allergens).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Allergens', () => {
      const allergens = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(allergens).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Allergens', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Allergens', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Allergens', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAllergensToCollectionIfMissing', () => {
      it('should add a Allergens to an empty array', () => {
        const allergens: IAllergens = sampleWithRequiredData;
        expectedResult = service.addAllergensToCollectionIfMissing([], allergens);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(allergens);
      });

      it('should not add a Allergens to an array that contains it', () => {
        const allergens: IAllergens = sampleWithRequiredData;
        const allergensCollection: IAllergens[] = [
          {
            ...allergens,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAllergensToCollectionIfMissing(allergensCollection, allergens);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Allergens to an array that doesn't contain it", () => {
        const allergens: IAllergens = sampleWithRequiredData;
        const allergensCollection: IAllergens[] = [sampleWithPartialData];
        expectedResult = service.addAllergensToCollectionIfMissing(allergensCollection, allergens);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(allergens);
      });

      it('should add only unique Allergens to an array', () => {
        const allergensArray: IAllergens[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const allergensCollection: IAllergens[] = [sampleWithRequiredData];
        expectedResult = service.addAllergensToCollectionIfMissing(allergensCollection, ...allergensArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const allergens: IAllergens = sampleWithRequiredData;
        const allergens2: IAllergens = sampleWithPartialData;
        expectedResult = service.addAllergensToCollectionIfMissing([], allergens, allergens2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(allergens);
        expect(expectedResult).toContain(allergens2);
      });

      it('should accept null and undefined values', () => {
        const allergens: IAllergens = sampleWithRequiredData;
        expectedResult = service.addAllergensToCollectionIfMissing([], null, allergens, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(allergens);
      });

      it('should return initial array if no Allergens is added', () => {
        const allergensCollection: IAllergens[] = [sampleWithRequiredData];
        expectedResult = service.addAllergensToCollectionIfMissing(allergensCollection, undefined, null);
        expect(expectedResult).toEqual(allergensCollection);
      });
    });

    describe('compareAllergens', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAllergens(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAllergens(entity1, entity2);
        const compareResult2 = service.compareAllergens(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAllergens(entity1, entity2);
        const compareResult2 = service.compareAllergens(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAllergens(entity1, entity2);
        const compareResult2 = service.compareAllergens(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
