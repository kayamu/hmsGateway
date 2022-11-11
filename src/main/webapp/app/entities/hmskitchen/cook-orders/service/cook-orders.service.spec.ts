import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICookOrders } from '../cook-orders.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cook-orders.test-samples';

import { CookOrdersService, RestCookOrders } from './cook-orders.service';

const requireRestSample: RestCookOrders = {
  ...sampleWithRequiredData,
  requestDate: sampleWithRequiredData.requestDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('CookOrders Service', () => {
  let service: CookOrdersService;
  let httpMock: HttpTestingController;
  let expectedResult: ICookOrders | ICookOrders[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CookOrdersService);
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

    it('should create a CookOrders', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cookOrders = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cookOrders).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CookOrders', () => {
      const cookOrders = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cookOrders).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CookOrders', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CookOrders', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CookOrders', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCookOrdersToCollectionIfMissing', () => {
      it('should add a CookOrders to an empty array', () => {
        const cookOrders: ICookOrders = sampleWithRequiredData;
        expectedResult = service.addCookOrdersToCollectionIfMissing([], cookOrders);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cookOrders);
      });

      it('should not add a CookOrders to an array that contains it', () => {
        const cookOrders: ICookOrders = sampleWithRequiredData;
        const cookOrdersCollection: ICookOrders[] = [
          {
            ...cookOrders,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCookOrdersToCollectionIfMissing(cookOrdersCollection, cookOrders);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CookOrders to an array that doesn't contain it", () => {
        const cookOrders: ICookOrders = sampleWithRequiredData;
        const cookOrdersCollection: ICookOrders[] = [sampleWithPartialData];
        expectedResult = service.addCookOrdersToCollectionIfMissing(cookOrdersCollection, cookOrders);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cookOrders);
      });

      it('should add only unique CookOrders to an array', () => {
        const cookOrdersArray: ICookOrders[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cookOrdersCollection: ICookOrders[] = [sampleWithRequiredData];
        expectedResult = service.addCookOrdersToCollectionIfMissing(cookOrdersCollection, ...cookOrdersArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cookOrders: ICookOrders = sampleWithRequiredData;
        const cookOrders2: ICookOrders = sampleWithPartialData;
        expectedResult = service.addCookOrdersToCollectionIfMissing([], cookOrders, cookOrders2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cookOrders);
        expect(expectedResult).toContain(cookOrders2);
      });

      it('should accept null and undefined values', () => {
        const cookOrders: ICookOrders = sampleWithRequiredData;
        expectedResult = service.addCookOrdersToCollectionIfMissing([], null, cookOrders, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cookOrders);
      });

      it('should return initial array if no CookOrders is added', () => {
        const cookOrdersCollection: ICookOrders[] = [sampleWithRequiredData];
        expectedResult = service.addCookOrdersToCollectionIfMissing(cookOrdersCollection, undefined, null);
        expect(expectedResult).toEqual(cookOrdersCollection);
      });
    });

    describe('compareCookOrders', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCookOrders(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCookOrders(entity1, entity2);
        const compareResult2 = service.compareCookOrders(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCookOrders(entity1, entity2);
        const compareResult2 = service.compareCookOrders(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCookOrders(entity1, entity2);
        const compareResult2 = service.compareCookOrders(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
