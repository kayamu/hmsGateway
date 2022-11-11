import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IConditionDetails } from '../condition-details.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../condition-details.test-samples';

import { ConditionDetailsService, RestConditionDetails } from './condition-details.service';

const requireRestSample: RestConditionDetails = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('ConditionDetails Service', () => {
  let service: ConditionDetailsService;
  let httpMock: HttpTestingController;
  let expectedResult: IConditionDetails | IConditionDetails[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConditionDetailsService);
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

    it('should create a ConditionDetails', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const conditionDetails = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(conditionDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConditionDetails', () => {
      const conditionDetails = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(conditionDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ConditionDetails', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ConditionDetails', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ConditionDetails', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConditionDetailsToCollectionIfMissing', () => {
      it('should add a ConditionDetails to an empty array', () => {
        const conditionDetails: IConditionDetails = sampleWithRequiredData;
        expectedResult = service.addConditionDetailsToCollectionIfMissing([], conditionDetails);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conditionDetails);
      });

      it('should not add a ConditionDetails to an array that contains it', () => {
        const conditionDetails: IConditionDetails = sampleWithRequiredData;
        const conditionDetailsCollection: IConditionDetails[] = [
          {
            ...conditionDetails,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConditionDetailsToCollectionIfMissing(conditionDetailsCollection, conditionDetails);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConditionDetails to an array that doesn't contain it", () => {
        const conditionDetails: IConditionDetails = sampleWithRequiredData;
        const conditionDetailsCollection: IConditionDetails[] = [sampleWithPartialData];
        expectedResult = service.addConditionDetailsToCollectionIfMissing(conditionDetailsCollection, conditionDetails);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conditionDetails);
      });

      it('should add only unique ConditionDetails to an array', () => {
        const conditionDetailsArray: IConditionDetails[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const conditionDetailsCollection: IConditionDetails[] = [sampleWithRequiredData];
        expectedResult = service.addConditionDetailsToCollectionIfMissing(conditionDetailsCollection, ...conditionDetailsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const conditionDetails: IConditionDetails = sampleWithRequiredData;
        const conditionDetails2: IConditionDetails = sampleWithPartialData;
        expectedResult = service.addConditionDetailsToCollectionIfMissing([], conditionDetails, conditionDetails2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conditionDetails);
        expect(expectedResult).toContain(conditionDetails2);
      });

      it('should accept null and undefined values', () => {
        const conditionDetails: IConditionDetails = sampleWithRequiredData;
        expectedResult = service.addConditionDetailsToCollectionIfMissing([], null, conditionDetails, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conditionDetails);
      });

      it('should return initial array if no ConditionDetails is added', () => {
        const conditionDetailsCollection: IConditionDetails[] = [sampleWithRequiredData];
        expectedResult = service.addConditionDetailsToCollectionIfMissing(conditionDetailsCollection, undefined, null);
        expect(expectedResult).toEqual(conditionDetailsCollection);
      });
    });

    describe('compareConditionDetails', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConditionDetails(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConditionDetails(entity1, entity2);
        const compareResult2 = service.compareConditionDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConditionDetails(entity1, entity2);
        const compareResult2 = service.compareConditionDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConditionDetails(entity1, entity2);
        const compareResult2 = service.compareConditionDetails(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
