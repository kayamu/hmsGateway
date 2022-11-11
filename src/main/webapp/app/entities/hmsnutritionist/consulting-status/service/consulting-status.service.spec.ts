import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConsultingStatus } from '../consulting-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../consulting-status.test-samples';

import { ConsultingStatusService } from './consulting-status.service';

const requireRestSample: IConsultingStatus = {
  ...sampleWithRequiredData,
};

describe('ConsultingStatus Service', () => {
  let service: ConsultingStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: IConsultingStatus | IConsultingStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConsultingStatusService);
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

    it('should create a ConsultingStatus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const consultingStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(consultingStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConsultingStatus', () => {
      const consultingStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(consultingStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ConsultingStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ConsultingStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ConsultingStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConsultingStatusToCollectionIfMissing', () => {
      it('should add a ConsultingStatus to an empty array', () => {
        const consultingStatus: IConsultingStatus = sampleWithRequiredData;
        expectedResult = service.addConsultingStatusToCollectionIfMissing([], consultingStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consultingStatus);
      });

      it('should not add a ConsultingStatus to an array that contains it', () => {
        const consultingStatus: IConsultingStatus = sampleWithRequiredData;
        const consultingStatusCollection: IConsultingStatus[] = [
          {
            ...consultingStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConsultingStatusToCollectionIfMissing(consultingStatusCollection, consultingStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConsultingStatus to an array that doesn't contain it", () => {
        const consultingStatus: IConsultingStatus = sampleWithRequiredData;
        const consultingStatusCollection: IConsultingStatus[] = [sampleWithPartialData];
        expectedResult = service.addConsultingStatusToCollectionIfMissing(consultingStatusCollection, consultingStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consultingStatus);
      });

      it('should add only unique ConsultingStatus to an array', () => {
        const consultingStatusArray: IConsultingStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const consultingStatusCollection: IConsultingStatus[] = [sampleWithRequiredData];
        expectedResult = service.addConsultingStatusToCollectionIfMissing(consultingStatusCollection, ...consultingStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consultingStatus: IConsultingStatus = sampleWithRequiredData;
        const consultingStatus2: IConsultingStatus = sampleWithPartialData;
        expectedResult = service.addConsultingStatusToCollectionIfMissing([], consultingStatus, consultingStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consultingStatus);
        expect(expectedResult).toContain(consultingStatus2);
      });

      it('should accept null and undefined values', () => {
        const consultingStatus: IConsultingStatus = sampleWithRequiredData;
        expectedResult = service.addConsultingStatusToCollectionIfMissing([], null, consultingStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consultingStatus);
      });

      it('should return initial array if no ConsultingStatus is added', () => {
        const consultingStatusCollection: IConsultingStatus[] = [sampleWithRequiredData];
        expectedResult = service.addConsultingStatusToCollectionIfMissing(consultingStatusCollection, undefined, null);
        expect(expectedResult).toEqual(consultingStatusCollection);
      });
    });

    describe('compareConsultingStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConsultingStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConsultingStatus(entity1, entity2);
        const compareResult2 = service.compareConsultingStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConsultingStatus(entity1, entity2);
        const compareResult2 = service.compareConsultingStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConsultingStatus(entity1, entity2);
        const compareResult2 = service.compareConsultingStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
