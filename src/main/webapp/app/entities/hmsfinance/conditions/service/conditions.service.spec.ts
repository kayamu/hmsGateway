import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IConditions } from '../conditions.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../conditions.test-samples';

import { ConditionsService, RestConditions } from './conditions.service';

const requireRestSample: RestConditions = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Conditions Service', () => {
  let service: ConditionsService;
  let httpMock: HttpTestingController;
  let expectedResult: IConditions | IConditions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConditionsService);
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

    it('should create a Conditions', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const conditions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(conditions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Conditions', () => {
      const conditions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(conditions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Conditions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Conditions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Conditions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConditionsToCollectionIfMissing', () => {
      it('should add a Conditions to an empty array', () => {
        const conditions: IConditions = sampleWithRequiredData;
        expectedResult = service.addConditionsToCollectionIfMissing([], conditions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conditions);
      });

      it('should not add a Conditions to an array that contains it', () => {
        const conditions: IConditions = sampleWithRequiredData;
        const conditionsCollection: IConditions[] = [
          {
            ...conditions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConditionsToCollectionIfMissing(conditionsCollection, conditions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Conditions to an array that doesn't contain it", () => {
        const conditions: IConditions = sampleWithRequiredData;
        const conditionsCollection: IConditions[] = [sampleWithPartialData];
        expectedResult = service.addConditionsToCollectionIfMissing(conditionsCollection, conditions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conditions);
      });

      it('should add only unique Conditions to an array', () => {
        const conditionsArray: IConditions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const conditionsCollection: IConditions[] = [sampleWithRequiredData];
        expectedResult = service.addConditionsToCollectionIfMissing(conditionsCollection, ...conditionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const conditions: IConditions = sampleWithRequiredData;
        const conditions2: IConditions = sampleWithPartialData;
        expectedResult = service.addConditionsToCollectionIfMissing([], conditions, conditions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conditions);
        expect(expectedResult).toContain(conditions2);
      });

      it('should accept null and undefined values', () => {
        const conditions: IConditions = sampleWithRequiredData;
        expectedResult = service.addConditionsToCollectionIfMissing([], null, conditions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conditions);
      });

      it('should return initial array if no Conditions is added', () => {
        const conditionsCollection: IConditions[] = [sampleWithRequiredData];
        expectedResult = service.addConditionsToCollectionIfMissing(conditionsCollection, undefined, null);
        expect(expectedResult).toEqual(conditionsCollection);
      });
    });

    describe('compareConditions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConditions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConditions(entity1, entity2);
        const compareResult2 = service.compareConditions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConditions(entity1, entity2);
        const compareResult2 = service.compareConditions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConditions(entity1, entity2);
        const compareResult2 = service.compareConditions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
