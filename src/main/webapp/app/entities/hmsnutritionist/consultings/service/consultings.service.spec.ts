import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IConsultings } from '../consultings.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../consultings.test-samples';

import { ConsultingsService, RestConsultings } from './consultings.service';

const requireRestSample: RestConsultings = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Consultings Service', () => {
  let service: ConsultingsService;
  let httpMock: HttpTestingController;
  let expectedResult: IConsultings | IConsultings[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConsultingsService);
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

    it('should create a Consultings', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const consultings = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(consultings).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Consultings', () => {
      const consultings = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(consultings).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Consultings', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Consultings', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Consultings', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConsultingsToCollectionIfMissing', () => {
      it('should add a Consultings to an empty array', () => {
        const consultings: IConsultings = sampleWithRequiredData;
        expectedResult = service.addConsultingsToCollectionIfMissing([], consultings);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consultings);
      });

      it('should not add a Consultings to an array that contains it', () => {
        const consultings: IConsultings = sampleWithRequiredData;
        const consultingsCollection: IConsultings[] = [
          {
            ...consultings,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConsultingsToCollectionIfMissing(consultingsCollection, consultings);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Consultings to an array that doesn't contain it", () => {
        const consultings: IConsultings = sampleWithRequiredData;
        const consultingsCollection: IConsultings[] = [sampleWithPartialData];
        expectedResult = service.addConsultingsToCollectionIfMissing(consultingsCollection, consultings);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consultings);
      });

      it('should add only unique Consultings to an array', () => {
        const consultingsArray: IConsultings[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const consultingsCollection: IConsultings[] = [sampleWithRequiredData];
        expectedResult = service.addConsultingsToCollectionIfMissing(consultingsCollection, ...consultingsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consultings: IConsultings = sampleWithRequiredData;
        const consultings2: IConsultings = sampleWithPartialData;
        expectedResult = service.addConsultingsToCollectionIfMissing([], consultings, consultings2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consultings);
        expect(expectedResult).toContain(consultings2);
      });

      it('should accept null and undefined values', () => {
        const consultings: IConsultings = sampleWithRequiredData;
        expectedResult = service.addConsultingsToCollectionIfMissing([], null, consultings, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consultings);
      });

      it('should return initial array if no Consultings is added', () => {
        const consultingsCollection: IConsultings[] = [sampleWithRequiredData];
        expectedResult = service.addConsultingsToCollectionIfMissing(consultingsCollection, undefined, null);
        expect(expectedResult).toEqual(consultingsCollection);
      });
    });

    describe('compareConsultings', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConsultings(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConsultings(entity1, entity2);
        const compareResult2 = service.compareConsultings(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConsultings(entity1, entity2);
        const compareResult2 = service.compareConsultings(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConsultings(entity1, entity2);
        const compareResult2 = service.compareConsultings(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
