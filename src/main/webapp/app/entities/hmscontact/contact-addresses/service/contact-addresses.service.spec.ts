import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IContactAddresses } from '../contact-addresses.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../contact-addresses.test-samples';

import { ContactAddressesService, RestContactAddresses } from './contact-addresses.service';

const requireRestSample: RestContactAddresses = {
  ...sampleWithRequiredData,
  contractStartDate: sampleWithRequiredData.contractStartDate?.format(DATE_FORMAT),
  createdDate: sampleWithRequiredData.createdDate?.format(DATE_FORMAT),
};

describe('ContactAddresses Service', () => {
  let service: ContactAddressesService;
  let httpMock: HttpTestingController;
  let expectedResult: IContactAddresses | IContactAddresses[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContactAddressesService);
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

    it('should create a ContactAddresses', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const contactAddresses = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contactAddresses).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContactAddresses', () => {
      const contactAddresses = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contactAddresses).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContactAddresses', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContactAddresses', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ContactAddresses', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContactAddressesToCollectionIfMissing', () => {
      it('should add a ContactAddresses to an empty array', () => {
        const contactAddresses: IContactAddresses = sampleWithRequiredData;
        expectedResult = service.addContactAddressesToCollectionIfMissing([], contactAddresses);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contactAddresses);
      });

      it('should not add a ContactAddresses to an array that contains it', () => {
        const contactAddresses: IContactAddresses = sampleWithRequiredData;
        const contactAddressesCollection: IContactAddresses[] = [
          {
            ...contactAddresses,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContactAddressesToCollectionIfMissing(contactAddressesCollection, contactAddresses);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContactAddresses to an array that doesn't contain it", () => {
        const contactAddresses: IContactAddresses = sampleWithRequiredData;
        const contactAddressesCollection: IContactAddresses[] = [sampleWithPartialData];
        expectedResult = service.addContactAddressesToCollectionIfMissing(contactAddressesCollection, contactAddresses);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contactAddresses);
      });

      it('should add only unique ContactAddresses to an array', () => {
        const contactAddressesArray: IContactAddresses[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contactAddressesCollection: IContactAddresses[] = [sampleWithRequiredData];
        expectedResult = service.addContactAddressesToCollectionIfMissing(contactAddressesCollection, ...contactAddressesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contactAddresses: IContactAddresses = sampleWithRequiredData;
        const contactAddresses2: IContactAddresses = sampleWithPartialData;
        expectedResult = service.addContactAddressesToCollectionIfMissing([], contactAddresses, contactAddresses2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contactAddresses);
        expect(expectedResult).toContain(contactAddresses2);
      });

      it('should accept null and undefined values', () => {
        const contactAddresses: IContactAddresses = sampleWithRequiredData;
        expectedResult = service.addContactAddressesToCollectionIfMissing([], null, contactAddresses, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contactAddresses);
      });

      it('should return initial array if no ContactAddresses is added', () => {
        const contactAddressesCollection: IContactAddresses[] = [sampleWithRequiredData];
        expectedResult = service.addContactAddressesToCollectionIfMissing(contactAddressesCollection, undefined, null);
        expect(expectedResult).toEqual(contactAddressesCollection);
      });
    });

    describe('compareContactAddresses', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContactAddresses(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContactAddresses(entity1, entity2);
        const compareResult2 = service.compareContactAddresses(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContactAddresses(entity1, entity2);
        const compareResult2 = service.compareContactAddresses(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContactAddresses(entity1, entity2);
        const compareResult2 = service.compareContactAddresses(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
