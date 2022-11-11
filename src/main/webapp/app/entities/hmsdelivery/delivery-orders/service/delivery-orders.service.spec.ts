import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDeliveryOrders } from '../delivery-orders.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../delivery-orders.test-samples';

import { DeliveryOrdersService, RestDeliveryOrders } from './delivery-orders.service';

const requireRestSample: RestDeliveryOrders = {
  ...sampleWithRequiredData,
  deliveryDate: sampleWithRequiredData.deliveryDate?.format(DATE_FORMAT),
  requestDate: sampleWithRequiredData.requestDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('DeliveryOrders Service', () => {
  let service: DeliveryOrdersService;
  let httpMock: HttpTestingController;
  let expectedResult: IDeliveryOrders | IDeliveryOrders[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DeliveryOrdersService);
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

    it('should create a DeliveryOrders', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deliveryOrders = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(deliveryOrders).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DeliveryOrders', () => {
      const deliveryOrders = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(deliveryOrders).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DeliveryOrders', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DeliveryOrders', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DeliveryOrders', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDeliveryOrdersToCollectionIfMissing', () => {
      it('should add a DeliveryOrders to an empty array', () => {
        const deliveryOrders: IDeliveryOrders = sampleWithRequiredData;
        expectedResult = service.addDeliveryOrdersToCollectionIfMissing([], deliveryOrders);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryOrders);
      });

      it('should not add a DeliveryOrders to an array that contains it', () => {
        const deliveryOrders: IDeliveryOrders = sampleWithRequiredData;
        const deliveryOrdersCollection: IDeliveryOrders[] = [
          {
            ...deliveryOrders,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDeliveryOrdersToCollectionIfMissing(deliveryOrdersCollection, deliveryOrders);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DeliveryOrders to an array that doesn't contain it", () => {
        const deliveryOrders: IDeliveryOrders = sampleWithRequiredData;
        const deliveryOrdersCollection: IDeliveryOrders[] = [sampleWithPartialData];
        expectedResult = service.addDeliveryOrdersToCollectionIfMissing(deliveryOrdersCollection, deliveryOrders);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryOrders);
      });

      it('should add only unique DeliveryOrders to an array', () => {
        const deliveryOrdersArray: IDeliveryOrders[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const deliveryOrdersCollection: IDeliveryOrders[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryOrdersToCollectionIfMissing(deliveryOrdersCollection, ...deliveryOrdersArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const deliveryOrders: IDeliveryOrders = sampleWithRequiredData;
        const deliveryOrders2: IDeliveryOrders = sampleWithPartialData;
        expectedResult = service.addDeliveryOrdersToCollectionIfMissing([], deliveryOrders, deliveryOrders2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryOrders);
        expect(expectedResult).toContain(deliveryOrders2);
      });

      it('should accept null and undefined values', () => {
        const deliveryOrders: IDeliveryOrders = sampleWithRequiredData;
        expectedResult = service.addDeliveryOrdersToCollectionIfMissing([], null, deliveryOrders, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryOrders);
      });

      it('should return initial array if no DeliveryOrders is added', () => {
        const deliveryOrdersCollection: IDeliveryOrders[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryOrdersToCollectionIfMissing(deliveryOrdersCollection, undefined, null);
        expect(expectedResult).toEqual(deliveryOrdersCollection);
      });
    });

    describe('compareDeliveryOrders', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDeliveryOrders(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDeliveryOrders(entity1, entity2);
        const compareResult2 = service.compareDeliveryOrders(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDeliveryOrders(entity1, entity2);
        const compareResult2 = service.compareDeliveryOrders(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDeliveryOrders(entity1, entity2);
        const compareResult2 = service.compareDeliveryOrders(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
