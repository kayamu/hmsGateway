import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISubItems } from '../sub-items.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../sub-items.test-samples';

import { SubItemsService, RestSubItems } from './sub-items.service';

const requireRestSample: RestSubItems = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('SubItems Service', () => {
  let service: SubItemsService;
  let httpMock: HttpTestingController;
  let expectedResult: ISubItems | ISubItems[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SubItemsService);
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

    it('should create a SubItems', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const subItems = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(subItems).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SubItems', () => {
      const subItems = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(subItems).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SubItems', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SubItems', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SubItems', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSubItemsToCollectionIfMissing', () => {
      it('should add a SubItems to an empty array', () => {
        const subItems: ISubItems = sampleWithRequiredData;
        expectedResult = service.addSubItemsToCollectionIfMissing([], subItems);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subItems);
      });

      it('should not add a SubItems to an array that contains it', () => {
        const subItems: ISubItems = sampleWithRequiredData;
        const subItemsCollection: ISubItems[] = [
          {
            ...subItems,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSubItemsToCollectionIfMissing(subItemsCollection, subItems);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SubItems to an array that doesn't contain it", () => {
        const subItems: ISubItems = sampleWithRequiredData;
        const subItemsCollection: ISubItems[] = [sampleWithPartialData];
        expectedResult = service.addSubItemsToCollectionIfMissing(subItemsCollection, subItems);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subItems);
      });

      it('should add only unique SubItems to an array', () => {
        const subItemsArray: ISubItems[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const subItemsCollection: ISubItems[] = [sampleWithRequiredData];
        expectedResult = service.addSubItemsToCollectionIfMissing(subItemsCollection, ...subItemsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const subItems: ISubItems = sampleWithRequiredData;
        const subItems2: ISubItems = sampleWithPartialData;
        expectedResult = service.addSubItemsToCollectionIfMissing([], subItems, subItems2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subItems);
        expect(expectedResult).toContain(subItems2);
      });

      it('should accept null and undefined values', () => {
        const subItems: ISubItems = sampleWithRequiredData;
        expectedResult = service.addSubItemsToCollectionIfMissing([], null, subItems, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subItems);
      });

      it('should return initial array if no SubItems is added', () => {
        const subItemsCollection: ISubItems[] = [sampleWithRequiredData];
        expectedResult = service.addSubItemsToCollectionIfMissing(subItemsCollection, undefined, null);
        expect(expectedResult).toEqual(subItemsCollection);
      });
    });

    describe('compareSubItems', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSubItems(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSubItems(entity1, entity2);
        const compareResult2 = service.compareSubItems(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSubItems(entity1, entity2);
        const compareResult2 = service.compareSubItems(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSubItems(entity1, entity2);
        const compareResult2 = service.compareSubItems(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
