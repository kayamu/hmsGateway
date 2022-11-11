import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerHealths } from '../customer-healths.model';

@Component({
  selector: 'jhi-customer-healths-detail',
  templateUrl: './customer-healths-detail.component.html',
})
export class CustomerHealthsDetailComponent implements OnInit {
  customerHealths: ICustomerHealths | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerHealths }) => {
      this.customerHealths = customerHealths;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
