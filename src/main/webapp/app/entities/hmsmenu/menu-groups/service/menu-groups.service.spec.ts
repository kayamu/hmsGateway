import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMenuGroups } from '../menu-groups.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../menu-groups.test-samples';

import { MenuGroupsService, RestMenuGroups } from './menu-groups.service';

const requireRestSample: RestMenuGroups = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('MenuGroups Service', () => {
  let service: MenuGroupsService;
  let httpMock: HttpTestingController;
  let expectedResult: IMenuGroups | IMenuGroups[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MenuGroupsService);
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

    it('should create a MenuGroups', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const menuGroups = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(menuGroups).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MenuGroups', () => {
      const menuGroups = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(menuGroups).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MenuGroups', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MenuGroups', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MenuGroups', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMenuGroupsToCollectionIfMissing', () => {
      it('should add a MenuGroups to an empty array', () => {
        const menuGroups: IMenuGroups = sampleWithRequiredData;
        expectedResult = service.addMenuGroupsToCollectionIfMissing([], menuGroups);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menuGroups);
      });

      it('should not add a MenuGroups to an array that contains it', () => {
        const menuGroups: IMenuGroups = sampleWithRequiredData;
        const menuGroupsCollection: IMenuGroups[] = [
          {
            ...menuGroups,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMenuGroupsToCollectionIfMissing(menuGroupsCollection, menuGroups);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MenuGroups to an array that doesn't contain it", () => {
        const menuGroups: IMenuGroups = sampleWithRequiredData;
        const menuGroupsCollection: IMenuGroups[] = [sampleWithPartialData];
        expectedResult = service.addMenuGroupsToCollectionIfMissing(menuGroupsCollection, menuGroups);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menuGroups);
      });

      it('should add only unique MenuGroups to an array', () => {
        const menuGroupsArray: IMenuGroups[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const menuGroupsCollection: IMenuGroups[] = [sampleWithRequiredData];
        expectedResult = service.addMenuGroupsToCollectionIfMissing(menuGroupsCollection, ...menuGroupsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const menuGroups: IMenuGroups = sampleWithRequiredData;
        const menuGroups2: IMenuGroups = sampleWithPartialData;
        expectedResult = service.addMenuGroupsToCollectionIfMissing([], menuGroups, menuGroups2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menuGroups);
        expect(expectedResult).toContain(menuGroups2);
      });

      it('should accept null and undefined values', () => {
        const menuGroups: IMenuGroups = sampleWithRequiredData;
        expectedResult = service.addMenuGroupsToCollectionIfMissing([], null, menuGroups, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menuGroups);
      });

      it('should return initial array if no MenuGroups is added', () => {
        const menuGroupsCollection: IMenuGroups[] = [sampleWithRequiredData];
        expectedResult = service.addMenuGroupsToCollectionIfMissing(menuGroupsCollection, undefined, null);
        expect(expectedResult).toEqual(menuGroupsCollection);
      });
    });

    describe('compareMenuGroups', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMenuGroups(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMenuGroups(entity1, entity2);
        const compareResult2 = service.compareMenuGroups(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMenuGroups(entity1, entity2);
        const compareResult2 = service.compareMenuGroups(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMenuGroups(entity1, entity2);
        const compareResult2 = service.compareMenuGroups(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
