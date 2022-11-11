import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITemplates } from '../templates.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../templates.test-samples';

import { TemplatesService, RestTemplates } from './templates.service';

const requireRestSample: RestTemplates = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Templates Service', () => {
  let service: TemplatesService;
  let httpMock: HttpTestingController;
  let expectedResult: ITemplates | ITemplates[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TemplatesService);
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

    it('should create a Templates', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const templates = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(templates).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Templates', () => {
      const templates = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(templates).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Templates', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Templates', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Templates', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTemplatesToCollectionIfMissing', () => {
      it('should add a Templates to an empty array', () => {
        const templates: ITemplates = sampleWithRequiredData;
        expectedResult = service.addTemplatesToCollectionIfMissing([], templates);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templates);
      });

      it('should not add a Templates to an array that contains it', () => {
        const templates: ITemplates = sampleWithRequiredData;
        const templatesCollection: ITemplates[] = [
          {
            ...templates,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTemplatesToCollectionIfMissing(templatesCollection, templates);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Templates to an array that doesn't contain it", () => {
        const templates: ITemplates = sampleWithRequiredData;
        const templatesCollection: ITemplates[] = [sampleWithPartialData];
        expectedResult = service.addTemplatesToCollectionIfMissing(templatesCollection, templates);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templates);
      });

      it('should add only unique Templates to an array', () => {
        const templatesArray: ITemplates[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const templatesCollection: ITemplates[] = [sampleWithRequiredData];
        expectedResult = service.addTemplatesToCollectionIfMissing(templatesCollection, ...templatesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const templates: ITemplates = sampleWithRequiredData;
        const templates2: ITemplates = sampleWithPartialData;
        expectedResult = service.addTemplatesToCollectionIfMissing([], templates, templates2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templates);
        expect(expectedResult).toContain(templates2);
      });

      it('should accept null and undefined values', () => {
        const templates: ITemplates = sampleWithRequiredData;
        expectedResult = service.addTemplatesToCollectionIfMissing([], null, templates, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templates);
      });

      it('should return initial array if no Templates is added', () => {
        const templatesCollection: ITemplates[] = [sampleWithRequiredData];
        expectedResult = service.addTemplatesToCollectionIfMissing(templatesCollection, undefined, null);
        expect(expectedResult).toEqual(templatesCollection);
      });
    });

    describe('compareTemplates', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTemplates(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTemplates(entity1, entity2);
        const compareResult2 = service.compareTemplates(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTemplates(entity1, entity2);
        const compareResult2 = service.compareTemplates(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTemplates(entity1, entity2);
        const compareResult2 = service.compareTemplates(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
