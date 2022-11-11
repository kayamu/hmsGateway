import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPayments } from '../payments.model';

@Component({
  selector: 'jhi-payments-detail',
  templateUrl: './payments-detail.component.html',
})
export class PaymentsDetailComponent implements OnInit {
  payments: IPayments | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payments }) => {
      this.payments = payments;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
