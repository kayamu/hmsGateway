import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDeliveryTransactions } from '../delivery-transactions.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../delivery-transactions.test-samples';

import { DeliveryTransactionsService, RestDeliveryTransactions } from './delivery-transactions.service';

const requireRestSample: RestDeliveryTransactions = {
  ...sampleWithRequiredData,
  statusChangedDate: sampleWithRequiredData.statusChangedDate?.format(DATE_FORMAT),
  transactionDate: sampleWithRequiredData.transactionDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('DeliveryTransactions Service', () => {
  let service: DeliveryTransactionsService;
  let httpMock: HttpTestingController;
  let expectedResult: IDeliveryTransactions | IDeliveryTransactions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DeliveryTransactionsService);
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

    it('should create a DeliveryTransactions', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deliveryTransactions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(deliveryTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DeliveryTransactions', () => {
      const deliveryTransactions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(deliveryTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DeliveryTransactions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DeliveryTransactions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DeliveryTransactions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDeliveryTransactionsToCollectionIfMissing', () => {
      it('should add a DeliveryTransactions to an empty array', () => {
        const deliveryTransactions: IDeliveryTransactions = sampleWithRequiredData;
        expectedResult = service.addDeliveryTransactionsToCollectionIfMissing([], deliveryTransactions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryTransactions);
      });

      it('should not add a DeliveryTransactions to an array that contains it', () => {
        const deliveryTransactions: IDeliveryTransactions = sampleWithRequiredData;
        const deliveryTransactionsCollection: IDeliveryTransactions[] = [
          {
            ...deliveryTransactions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDeliveryTransactionsToCollectionIfMissing(deliveryTransactionsCollection, deliveryTransactions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DeliveryTransactions to an array that doesn't contain it", () => {
        const deliveryTransactions: IDeliveryTransactions = sampleWithRequiredData;
        const deliveryTransactionsCollection: IDeliveryTransactions[] = [sampleWithPartialData];
        expectedResult = service.addDeliveryTransactionsToCollectionIfMissing(deliveryTransactionsCollection, deliveryTransactions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryTransactions);
      });

      it('should add only unique DeliveryTransactions to an array', () => {
        const deliveryTransactionsArray: IDeliveryTransactions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const deliveryTransactionsCollection: IDeliveryTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryTransactionsToCollectionIfMissing(deliveryTransactionsCollection, ...deliveryTransactionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const deliveryTransactions: IDeliveryTransactions = sampleWithRequiredData;
        const deliveryTransactions2: IDeliveryTransactions = sampleWithPartialData;
        expectedResult = service.addDeliveryTransactionsToCollectionIfMissing([], deliveryTransactions, deliveryTransactions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryTransactions);
        expect(expectedResult).toContain(deliveryTransactions2);
      });

      it('should accept null and undefined values', () => {
        const deliveryTransactions: IDeliveryTransactions = sampleWithRequiredData;
        expectedResult = service.addDeliveryTransactionsToCollectionIfMissing([], null, deliveryTransactions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryTransactions);
      });

      it('should return initial array if no DeliveryTransactions is added', () => {
        const deliveryTransactionsCollection: IDeliveryTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryTransactionsToCollectionIfMissing(deliveryTransactionsCollection, undefined, null);
        expect(expectedResult).toEqual(deliveryTransactionsCollection);
      });
    });

    describe('compareDeliveryTransactions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDeliveryTransactions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDeliveryTransactions(entity1, entity2);
        const compareResult2 = service.compareDeliveryTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDeliveryTransactions(entity1, entity2);
        const compareResult2 = service.compareDeliveryTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDeliveryTransactions(entity1, entity2);
        const compareResult2 = service.compareDeliveryTransactions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
