import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IImagesUrl } from '../images-url.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../images-url.test-samples';

import { ImagesUrlService, RestImagesUrl } from './images-url.service';

const requireRestSample: RestImagesUrl = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('ImagesUrl Service', () => {
  let service: ImagesUrlService;
  let httpMock: HttpTestingController;
  let expectedResult: IImagesUrl | IImagesUrl[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ImagesUrlService);
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

    it('should create a ImagesUrl', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const imagesUrl = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(imagesUrl).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ImagesUrl', () => {
      const imagesUrl = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(imagesUrl).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ImagesUrl', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ImagesUrl', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ImagesUrl', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addImagesUrlToCollectionIfMissing', () => {
      it('should add a ImagesUrl to an empty array', () => {
        const imagesUrl: IImagesUrl = sampleWithRequiredData;
        expectedResult = service.addImagesUrlToCollectionIfMissing([], imagesUrl);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(imagesUrl);
      });

      it('should not add a ImagesUrl to an array that contains it', () => {
        const imagesUrl: IImagesUrl = sampleWithRequiredData;
        const imagesUrlCollection: IImagesUrl[] = [
          {
            ...imagesUrl,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addImagesUrlToCollectionIfMissing(imagesUrlCollection, imagesUrl);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ImagesUrl to an array that doesn't contain it", () => {
        const imagesUrl: IImagesUrl = sampleWithRequiredData;
        const imagesUrlCollection: IImagesUrl[] = [sampleWithPartialData];
        expectedResult = service.addImagesUrlToCollectionIfMissing(imagesUrlCollection, imagesUrl);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(imagesUrl);
      });

      it('should add only unique ImagesUrl to an array', () => {
        const imagesUrlArray: IImagesUrl[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const imagesUrlCollection: IImagesUrl[] = [sampleWithRequiredData];
        expectedResult = service.addImagesUrlToCollectionIfMissing(imagesUrlCollection, ...imagesUrlArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const imagesUrl: IImagesUrl = sampleWithRequiredData;
        const imagesUrl2: IImagesUrl = sampleWithPartialData;
        expectedResult = service.addImagesUrlToCollectionIfMissing([], imagesUrl, imagesUrl2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(imagesUrl);
        expect(expectedResult).toContain(imagesUrl2);
      });

      it('should accept null and undefined values', () => {
        const imagesUrl: IImagesUrl = sampleWithRequiredData;
        expectedResult = service.addImagesUrlToCollectionIfMissing([], null, imagesUrl, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(imagesUrl);
      });

      it('should return initial array if no ImagesUrl is added', () => {
        const imagesUrlCollection: IImagesUrl[] = [sampleWithRequiredData];
        expectedResult = service.addImagesUrlToCollectionIfMissing(imagesUrlCollection, undefined, null);
        expect(expectedResult).toEqual(imagesUrlCollection);
      });
    });

    describe('compareImagesUrl', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareImagesUrl(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareImagesUrl(entity1, entity2);
        const compareResult2 = service.compareImagesUrl(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareImagesUrl(entity1, entity2);
        const compareResult2 = service.compareImagesUrl(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareImagesUrl(entity1, entity2);
        const compareResult2 = service.compareImagesUrl(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
