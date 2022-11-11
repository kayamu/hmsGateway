import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryTransactions } from '../delivery-transactions.model';

@Component({
  selector: 'jhi-delivery-transactions-detail',
  templateUrl: './delivery-transactions-detail.component.html',
})
export class DeliveryTransactionsDetailComponent implements OnInit {
  deliveryTransactions: IDeliveryTransactions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryTransactions }) => {
      this.deliveryTransactions = deliveryTransactions;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
