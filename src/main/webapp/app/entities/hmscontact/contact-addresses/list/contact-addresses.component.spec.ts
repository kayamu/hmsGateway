import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContactAddressesService } from '../service/contact-addresses.service';

import { ContactAddressesComponent } from './contact-addresses.component';

describe('ContactAddresses Management Component', () => {
  let comp: ContactAddressesComponent;
  let fixture: ComponentFixture<ContactAddressesComponent>;
  let service: ContactAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'contact-addresses', component: ContactAddressesComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ContactAddressesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ContactAddressesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContactAddressesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ContactAddressesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.contactAddresses?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to contactAddressesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getContactAddressesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getContactAddressesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
