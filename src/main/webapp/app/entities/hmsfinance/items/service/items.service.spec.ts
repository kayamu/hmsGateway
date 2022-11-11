import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IItems } from '../items.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../items.test-samples';

import { ItemsService, RestItems } from './items.service';

const requireRestSample: RestItems = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Items Service', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;
  let expectedResult: IItems | IItems[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItemsService);
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

    it('should create a Items', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const items = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(items).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Items', () => {
      const items = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(items).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Items', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Items', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Items', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addItemsToCollectionIfMissing', () => {
      it('should add a Items to an empty array', () => {
        const items: IItems = sampleWithRequiredData;
        expectedResult = service.addItemsToCollectionIfMissing([], items);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(items);
      });

      it('should not add a Items to an array that contains it', () => {
        const items: IItems = sampleWithRequiredData;
        const itemsCollection: IItems[] = [
          {
            ...items,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addItemsToCollectionIfMissing(itemsCollection, items);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Items to an array that doesn't contain it", () => {
        const items: IItems = sampleWithRequiredData;
        const itemsCollection: IItems[] = [sampleWithPartialData];
        expectedResult = service.addItemsToCollectionIfMissing(itemsCollection, items);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(items);
      });

      it('should add only unique Items to an array', () => {
        const itemsArray: IItems[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const itemsCollection: IItems[] = [sampleWithRequiredData];
        expectedResult = service.addItemsToCollectionIfMissing(itemsCollection, ...itemsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const items: IItems = sampleWithRequiredData;
        const items2: IItems = sampleWithPartialData;
        expectedResult = service.addItemsToCollectionIfMissing([], items, items2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(items);
        expect(expectedResult).toContain(items2);
      });

      it('should accept null and undefined values', () => {
        const items: IItems = sampleWithRequiredData;
        expectedResult = service.addItemsToCollectionIfMissing([], null, items, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(items);
      });

      it('should return initial array if no Items is added', () => {
        const itemsCollection: IItems[] = [sampleWithRequiredData];
        expectedResult = service.addItemsToCollectionIfMissing(itemsCollection, undefined, null);
        expect(expectedResult).toEqual(itemsCollection);
      });
    });

    describe('compareItems', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareItems(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareItems(entity1, entity2);
        const compareResult2 = service.compareItems(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareItems(entity1, entity2);
        const compareResult2 = service.compareItems(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareItems(entity1, entity2);
        const compareResult2 = service.compareItems(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
