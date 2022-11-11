import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IEpicrysis } from '../epicrysis.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../epicrysis.test-samples';

import { EpicrysisService, RestEpicrysis } from './epicrysis.service';

const requireRestSample: RestEpicrysis = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Epicrysis Service', () => {
  let service: EpicrysisService;
  let httpMock: HttpTestingController;
  let expectedResult: IEpicrysis | IEpicrysis[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EpicrysisService);
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

    it('should create a Epicrysis', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const epicrysis = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(epicrysis).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Epicrysis', () => {
      const epicrysis = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(epicrysis).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Epicrysis', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Epicrysis', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Epicrysis', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEpicrysisToCollectionIfMissing', () => {
      it('should add a Epicrysis to an empty array', () => {
        const epicrysis: IEpicrysis = sampleWithRequiredData;
        expectedResult = service.addEpicrysisToCollectionIfMissing([], epicrysis);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(epicrysis);
      });

      it('should not add a Epicrysis to an array that contains it', () => {
        const epicrysis: IEpicrysis = sampleWithRequiredData;
        const epicrysisCollection: IEpicrysis[] = [
          {
            ...epicrysis,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEpicrysisToCollectionIfMissing(epicrysisCollection, epicrysis);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Epicrysis to an array that doesn't contain it", () => {
        const epicrysis: IEpicrysis = sampleWithRequiredData;
        const epicrysisCollection: IEpicrysis[] = [sampleWithPartialData];
        expectedResult = service.addEpicrysisToCollectionIfMissing(epicrysisCollection, epicrysis);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(epicrysis);
      });

      it('should add only unique Epicrysis to an array', () => {
        const epicrysisArray: IEpicrysis[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const epicrysisCollection: IEpicrysis[] = [sampleWithRequiredData];
        expectedResult = service.addEpicrysisToCollectionIfMissing(epicrysisCollection, ...epicrysisArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const epicrysis: IEpicrysis = sampleWithRequiredData;
        const epicrysis2: IEpicrysis = sampleWithPartialData;
        expectedResult = service.addEpicrysisToCollectionIfMissing([], epicrysis, epicrysis2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(epicrysis);
        expect(expectedResult).toContain(epicrysis2);
      });

      it('should accept null and undefined values', () => {
        const epicrysis: IEpicrysis = sampleWithRequiredData;
        expectedResult = service.addEpicrysisToCollectionIfMissing([], null, epicrysis, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(epicrysis);
      });

      it('should return initial array if no Epicrysis is added', () => {
        const epicrysisCollection: IEpicrysis[] = [sampleWithRequiredData];
        expectedResult = service.addEpicrysisToCollectionIfMissing(epicrysisCollection, undefined, null);
        expect(expectedResult).toEqual(epicrysisCollection);
      });
    });

    describe('compareEpicrysis', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEpicrysis(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEpicrysis(entity1, entity2);
        const compareResult2 = service.compareEpicrysis(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEpicrysis(entity1, entity2);
        const compareResult2 = service.compareEpicrysis(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEpicrysis(entity1, entity2);
        const compareResult2 = service.compareEpicrysis(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
