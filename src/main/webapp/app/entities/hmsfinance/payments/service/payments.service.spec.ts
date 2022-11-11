import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPayments } from '../payments.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../payments.test-samples';

import { PaymentsService, RestPayments } from './payments.service';

const requireRestSample: RestPayments = {
  ...sampleWithRequiredData,
  operationDate: sampleWithRequiredData.operationDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Payments Service', () => {
  let service: PaymentsService;
  let httpMock: HttpTestingController;
  let expectedResult: IPayments | IPayments[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaymentsService);
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

    it('should create a Payments', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const payments = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(payments).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Payments', () => {
      const payments = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(payments).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Payments', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Payments', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Payments', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPaymentsToCollectionIfMissing', () => {
      it('should add a Payments to an empty array', () => {
        const payments: IPayments = sampleWithRequiredData;
        expectedResult = service.addPaymentsToCollectionIfMissing([], payments);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(payments);
      });

      it('should not add a Payments to an array that contains it', () => {
        const payments: IPayments = sampleWithRequiredData;
        const paymentsCollection: IPayments[] = [
          {
            ...payments,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPaymentsToCollectionIfMissing(paymentsCollection, payments);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Payments to an array that doesn't contain it", () => {
        const payments: IPayments = sampleWithRequiredData;
        const paymentsCollection: IPayments[] = [sampleWithPartialData];
        expectedResult = service.addPaymentsToCollectionIfMissing(paymentsCollection, payments);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(payments);
      });

      it('should add only unique Payments to an array', () => {
        const paymentsArray: IPayments[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const paymentsCollection: IPayments[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentsToCollectionIfMissing(paymentsCollection, ...paymentsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const payments: IPayments = sampleWithRequiredData;
        const payments2: IPayments = sampleWithPartialData;
        expectedResult = service.addPaymentsToCollectionIfMissing([], payments, payments2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(payments);
        expect(expectedResult).toContain(payments2);
      });

      it('should accept null and undefined values', () => {
        const payments: IPayments = sampleWithRequiredData;
        expectedResult = service.addPaymentsToCollectionIfMissing([], null, payments, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(payments);
      });

      it('should return initial array if no Payments is added', () => {
        const paymentsCollection: IPayments[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentsToCollectionIfMissing(paymentsCollection, undefined, null);
        expect(expectedResult).toEqual(paymentsCollection);
      });
    });

    describe('comparePayments', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePayments(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePayments(entity1, entity2);
        const compareResult2 = service.comparePayments(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePayments(entity1, entity2);
        const compareResult2 = service.comparePayments(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePayments(entity1, entity2);
        const compareResult2 = service.comparePayments(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
