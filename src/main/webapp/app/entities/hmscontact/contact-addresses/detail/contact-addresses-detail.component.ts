import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactAddresses } from '../contact-addresses.model';

@Component({
  selector: 'jhi-contact-addresses-detail',
  templateUrl: './contact-addresses-detail.component.html',
})
export class ContactAddressesDetailComponent implements OnInit {
  contactAddresses: IContactAddresses | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactAddresses }) => {
      this.contactAddresses = contactAddresses;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
