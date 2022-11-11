import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IRecipies } from '../recipies.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../recipies.test-samples';

import { RecipiesService, RestRecipies } from './recipies.service';

const requireRestSample: RestRecipies = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Recipies Service', () => {
  let service: RecipiesService;
  let httpMock: HttpTestingController;
  let expectedResult: IRecipies | IRecipies[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RecipiesService);
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

    it('should create a Recipies', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const recipies = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(recipies).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Recipies', () => {
      const recipies = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(recipies).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Recipies', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Recipies', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Recipies', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRecipiesToCollectionIfMissing', () => {
      it('should add a Recipies to an empty array', () => {
        const recipies: IRecipies = sampleWithRequiredData;
        expectedResult = service.addRecipiesToCollectionIfMissing([], recipies);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(recipies);
      });

      it('should not add a Recipies to an array that contains it', () => {
        const recipies: IRecipies = sampleWithRequiredData;
        const recipiesCollection: IRecipies[] = [
          {
            ...recipies,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRecipiesToCollectionIfMissing(recipiesCollection, recipies);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Recipies to an array that doesn't contain it", () => {
        const recipies: IRecipies = sampleWithRequiredData;
        const recipiesCollection: IRecipies[] = [sampleWithPartialData];
        expectedResult = service.addRecipiesToCollectionIfMissing(recipiesCollection, recipies);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(recipies);
      });

      it('should add only unique Recipies to an array', () => {
        const recipiesArray: IRecipies[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const recipiesCollection: IRecipies[] = [sampleWithRequiredData];
        expectedResult = service.addRecipiesToCollectionIfMissing(recipiesCollection, ...recipiesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const recipies: IRecipies = sampleWithRequiredData;
        const recipies2: IRecipies = sampleWithPartialData;
        expectedResult = service.addRecipiesToCollectionIfMissing([], recipies, recipies2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(recipies);
        expect(expectedResult).toContain(recipies2);
      });

      it('should accept null and undefined values', () => {
        const recipies: IRecipies = sampleWithRequiredData;
        expectedResult = service.addRecipiesToCollectionIfMissing([], null, recipies, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(recipies);
      });

      it('should return initial array if no Recipies is added', () => {
        const recipiesCollection: IRecipies[] = [sampleWithRequiredData];
        expectedResult = service.addRecipiesToCollectionIfMissing(recipiesCollection, undefined, null);
        expect(expectedResult).toEqual(recipiesCollection);
      });
    });

    describe('compareRecipies', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRecipies(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRecipies(entity1, entity2);
        const compareResult2 = service.compareRecipies(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRecipies(entity1, entity2);
        const compareResult2 = service.compareRecipies(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRecipies(entity1, entity2);
        const compareResult2 = service.compareRecipies(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
