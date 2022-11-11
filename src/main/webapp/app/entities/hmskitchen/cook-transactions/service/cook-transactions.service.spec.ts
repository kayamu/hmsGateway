import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICookTransactions } from '../cook-transactions.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cook-transactions.test-samples';

import { CookTransactionsService, RestCookTransactions } from './cook-transactions.service';

const requireRestSample: RestCookTransactions = {
  ...sampleWithRequiredData,
  statusChangedDate: sampleWithRequiredData.statusChangedDate?.format(DATE_FORMAT),
  transactionDate: sampleWithRequiredData.transactionDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('CookTransactions Service', () => {
  let service: CookTransactionsService;
  let httpMock: HttpTestingController;
  let expectedResult: ICookTransactions | ICookTransactions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CookTransactionsService);
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

    it('should create a CookTransactions', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cookTransactions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cookTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CookTransactions', () => {
      const cookTransactions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cookTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CookTransactions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CookTransactions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CookTransactions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCookTransactionsToCollectionIfMissing', () => {
      it('should add a CookTransactions to an empty array', () => {
        const cookTransactions: ICookTransactions = sampleWithRequiredData;
        expectedResult = service.addCookTransactionsToCollectionIfMissing([], cookTransactions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cookTransactions);
      });

      it('should not add a CookTransactions to an array that contains it', () => {
        const cookTransactions: ICookTransactions = sampleWithRequiredData;
        const cookTransactionsCollection: ICookTransactions[] = [
          {
            ...cookTransactions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCookTransactionsToCollectionIfMissing(cookTransactionsCollection, cookTransactions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CookTransactions to an array that doesn't contain it", () => {
        const cookTransactions: ICookTransactions = sampleWithRequiredData;
        const cookTransactionsCollection: ICookTransactions[] = [sampleWithPartialData];
        expectedResult = service.addCookTransactionsToCollectionIfMissing(cookTransactionsCollection, cookTransactions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cookTransactions);
      });

      it('should add only unique CookTransactions to an array', () => {
        const cookTransactionsArray: ICookTransactions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cookTransactionsCollection: ICookTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addCookTransactionsToCollectionIfMissing(cookTransactionsCollection, ...cookTransactionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cookTransactions: ICookTransactions = sampleWithRequiredData;
        const cookTransactions2: ICookTransactions = sampleWithPartialData;
        expectedResult = service.addCookTransactionsToCollectionIfMissing([], cookTransactions, cookTransactions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cookTransactions);
        expect(expectedResult).toContain(cookTransactions2);
      });

      it('should accept null and undefined values', () => {
        const cookTransactions: ICookTransactions = sampleWithRequiredData;
        expectedResult = service.addCookTransactionsToCollectionIfMissing([], null, cookTransactions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cookTransactions);
      });

      it('should return initial array if no CookTransactions is added', () => {
        const cookTransactionsCollection: ICookTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addCookTransactionsToCollectionIfMissing(cookTransactionsCollection, undefined, null);
        expect(expectedResult).toEqual(cookTransactionsCollection);
      });
    });

    describe('compareCookTransactions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCookTransactions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCookTransactions(entity1, entity2);
        const compareResult2 = service.compareCookTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCookTransactions(entity1, entity2);
        const compareResult2 = service.compareCookTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCookTransactions(entity1, entity2);
        const compareResult2 = service.compareCookTransactions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
