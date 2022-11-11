import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoices } from '../invoices.model';

@Component({
  selector: 'jhi-invoices-detail',
  templateUrl: './invoices-detail.component.html',
})
export class InvoicesDetailComponent implements OnInit {
  invoices: IInvoices | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoices }) => {
      this.invoices = invoices;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
