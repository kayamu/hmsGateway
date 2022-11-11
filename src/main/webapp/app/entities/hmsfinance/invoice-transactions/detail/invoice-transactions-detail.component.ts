import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoiceTransactions } from '../invoice-transactions.model';

@Component({
  selector: 'jhi-invoice-transactions-detail',
  templateUrl: './invoice-transactions-detail.component.html',
})
export class InvoiceTransactionsDetailComponent implements OnInit {
  invoiceTransactions: IInvoiceTransactions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoiceTransactions }) => {
      this.invoiceTransactions = invoiceTransactions;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
