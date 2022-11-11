import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContactAddressesDetailComponent } from './contact-addresses-detail.component';

describe('ContactAddresses Management Detail Component', () => {
  let comp: ContactAddressesDetailComponent;
  let fixture: ComponentFixture<ContactAddressesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAddressesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ contactAddresses: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ContactAddressesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ContactAddressesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load contactAddresses on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.contactAddresses).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
