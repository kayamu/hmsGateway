import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IInvoiceDetails } from '../invoice-details.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../invoice-details.test-samples';

import { InvoiceDetailsService, RestInvoiceDetails } from './invoice-details.service';

const requireRestSample: RestInvoiceDetails = {
  ...sampleWithRequiredData,
  subscriptionStartingDate: sampleWithRequiredData.subscriptionStartingDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('InvoiceDetails Service', () => {
  let service: InvoiceDetailsService;
  let httpMock: HttpTestingController;
  let expectedResult: IInvoiceDetails | IInvoiceDetails[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InvoiceDetailsService);
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

    it('should create a InvoiceDetails', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const invoiceDetails = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(invoiceDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InvoiceDetails', () => {
      const invoiceDetails = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(invoiceDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InvoiceDetails', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InvoiceDetails', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InvoiceDetails', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInvoiceDetailsToCollectionIfMissing', () => {
      it('should add a InvoiceDetails to an empty array', () => {
        const invoiceDetails: IInvoiceDetails = sampleWithRequiredData;
        expectedResult = service.addInvoiceDetailsToCollectionIfMissing([], invoiceDetails);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(invoiceDetails);
      });

      it('should not add a InvoiceDetails to an array that contains it', () => {
        const invoiceDetails: IInvoiceDetails = sampleWithRequiredData;
        const invoiceDetailsCollection: IInvoiceDetails[] = [
          {
            ...invoiceDetails,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInvoiceDetailsToCollectionIfMissing(invoiceDetailsCollection, invoiceDetails);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InvoiceDetails to an array that doesn't contain it", () => {
        const invoiceDetails: IInvoiceDetails = sampleWithRequiredData;
        const invoiceDetailsCollection: IInvoiceDetails[] = [sampleWithPartialData];
        expectedResult = service.addInvoiceDetailsToCollectionIfMissing(invoiceDetailsCollection, invoiceDetails);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(invoiceDetails);
      });

      it('should add only unique InvoiceDetails to an array', () => {
        const invoiceDetailsArray: IInvoiceDetails[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const invoiceDetailsCollection: IInvoiceDetails[] = [sampleWithRequiredData];
        expectedResult = service.addInvoiceDetailsToCollectionIfMissing(invoiceDetailsCollection, ...invoiceDetailsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const invoiceDetails: IInvoiceDetails = sampleWithRequiredData;
        const invoiceDetails2: IInvoiceDetails = sampleWithPartialData;
        expectedResult = service.addInvoiceDetailsToCollectionIfMissing([], invoiceDetails, invoiceDetails2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(invoiceDetails);
        expect(expectedResult).toContain(invoiceDetails2);
      });

      it('should accept null and undefined values', () => {
        const invoiceDetails: IInvoiceDetails = sampleWithRequiredData;
        expectedResult = service.addInvoiceDetailsToCollectionIfMissing([], null, invoiceDetails, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(invoiceDetails);
      });

      it('should return initial array if no InvoiceDetails is added', () => {
        const invoiceDetailsCollection: IInvoiceDetails[] = [sampleWithRequiredData];
        expectedResult = service.addInvoiceDetailsToCollectionIfMissing(invoiceDetailsCollection, undefined, null);
        expect(expectedResult).toEqual(invoiceDetailsCollection);
      });
    });

    describe('compareInvoiceDetails', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInvoiceDetails(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInvoiceDetails(entity1, entity2);
        const compareResult2 = service.compareInvoiceDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInvoiceDetails(entity1, entity2);
        const compareResult2 = service.compareInvoiceDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInvoiceDetails(entity1, entity2);
        const compareResult2 = service.compareInvoiceDetails(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
