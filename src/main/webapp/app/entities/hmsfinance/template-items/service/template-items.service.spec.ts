import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITemplateItems } from '../template-items.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../template-items.test-samples';

import { TemplateItemsService, RestTemplateItems } from './template-items.service';

const requireRestSample: RestTemplateItems = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.format(DATE_FORMAT),
  dueDate: sampleWithRequiredData.dueDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('TemplateItems Service', () => {
  let service: TemplateItemsService;
  let httpMock: HttpTestingController;
  let expectedResult: ITemplateItems | ITemplateItems[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TemplateItemsService);
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

    it('should create a TemplateItems', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const templateItems = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(templateItems).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TemplateItems', () => {
      const templateItems = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(templateItems).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TemplateItems', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TemplateItems', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TemplateItems', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTemplateItemsToCollectionIfMissing', () => {
      it('should add a TemplateItems to an empty array', () => {
        const templateItems: ITemplateItems = sampleWithRequiredData;
        expectedResult = service.addTemplateItemsToCollectionIfMissing([], templateItems);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templateItems);
      });

      it('should not add a TemplateItems to an array that contains it', () => {
        const templateItems: ITemplateItems = sampleWithRequiredData;
        const templateItemsCollection: ITemplateItems[] = [
          {
            ...templateItems,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTemplateItemsToCollectionIfMissing(templateItemsCollection, templateItems);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TemplateItems to an array that doesn't contain it", () => {
        const templateItems: ITemplateItems = sampleWithRequiredData;
        const templateItemsCollection: ITemplateItems[] = [sampleWithPartialData];
        expectedResult = service.addTemplateItemsToCollectionIfMissing(templateItemsCollection, templateItems);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templateItems);
      });

      it('should add only unique TemplateItems to an array', () => {
        const templateItemsArray: ITemplateItems[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const templateItemsCollection: ITemplateItems[] = [sampleWithRequiredData];
        expectedResult = service.addTemplateItemsToCollectionIfMissing(templateItemsCollection, ...templateItemsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const templateItems: ITemplateItems = sampleWithRequiredData;
        const templateItems2: ITemplateItems = sampleWithPartialData;
        expectedResult = service.addTemplateItemsToCollectionIfMissing([], templateItems, templateItems2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templateItems);
        expect(expectedResult).toContain(templateItems2);
      });

      it('should accept null and undefined values', () => {
        const templateItems: ITemplateItems = sampleWithRequiredData;
        expectedResult = service.addTemplateItemsToCollectionIfMissing([], null, templateItems, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templateItems);
      });

      it('should return initial array if no TemplateItems is added', () => {
        const templateItemsCollection: ITemplateItems[] = [sampleWithRequiredData];
        expectedResult = service.addTemplateItemsToCollectionIfMissing(templateItemsCollection, undefined, null);
        expect(expectedResult).toEqual(templateItemsCollection);
      });
    });

    describe('compareTemplateItems', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTemplateItems(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTemplateItems(entity1, entity2);
        const compareResult2 = service.compareTemplateItems(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTemplateItems(entity1, entity2);
        const compareResult2 = service.compareTemplateItems(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTemplateItems(entity1, entity2);
        const compareResult2 = service.compareTemplateItems(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
