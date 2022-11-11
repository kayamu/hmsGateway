import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMenus } from '../menus.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../menus.test-samples';

import { MenusService, RestMenus } from './menus.service';

const requireRestSample: RestMenus = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('Menus Service', () => {
  let service: MenusService;
  let httpMock: HttpTestingController;
  let expectedResult: IMenus | IMenus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MenusService);
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

    it('should create a Menus', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const menus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(menus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Menus', () => {
      const menus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(menus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Menus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Menus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Menus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMenusToCollectionIfMissing', () => {
      it('should add a Menus to an empty array', () => {
        const menus: IMenus = sampleWithRequiredData;
        expectedResult = service.addMenusToCollectionIfMissing([], menus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menus);
      });

      it('should not add a Menus to an array that contains it', () => {
        const menus: IMenus = sampleWithRequiredData;
        const menusCollection: IMenus[] = [
          {
            ...menus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMenusToCollectionIfMissing(menusCollection, menus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Menus to an array that doesn't contain it", () => {
        const menus: IMenus = sampleWithRequiredData;
        const menusCollection: IMenus[] = [sampleWithPartialData];
        expectedResult = service.addMenusToCollectionIfMissing(menusCollection, menus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menus);
      });

      it('should add only unique Menus to an array', () => {
        const menusArray: IMenus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const menusCollection: IMenus[] = [sampleWithRequiredData];
        expectedResult = service.addMenusToCollectionIfMissing(menusCollection, ...menusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const menus: IMenus = sampleWithRequiredData;
        const menus2: IMenus = sampleWithPartialData;
        expectedResult = service.addMenusToCollectionIfMissing([], menus, menus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menus);
        expect(expectedResult).toContain(menus2);
      });

      it('should accept null and undefined values', () => {
        const menus: IMenus = sampleWithRequiredData;
        expectedResult = service.addMenusToCollectionIfMissing([], null, menus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menus);
      });

      it('should return initial array if no Menus is added', () => {
        const menusCollection: IMenus[] = [sampleWithRequiredData];
        expectedResult = service.addMenusToCollectionIfMissing(menusCollection, undefined, null);
        expect(expectedResult).toEqual(menusCollection);
      });
    });

    describe('compareMenus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMenus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMenus(entity1, entity2);
        const compareResult2 = service.compareMenus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMenus(entity1, entity2);
        const compareResult2 = service.compareMenus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMenus(entity1, entity2);
        const compareResult2 = service.compareMenus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
