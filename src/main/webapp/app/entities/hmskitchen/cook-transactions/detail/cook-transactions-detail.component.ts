import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICookTransactions } from '../cook-transactions.model';

@Component({
  selector: 'jhi-cook-transactions-detail',
  templateUrl: './cook-transactions-detail.component.html',
})
export class CookTransactionsDetailComponent implements OnInit {
  cookTransactions: ICookTransactions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cookTransactions }) => {
      this.cookTransactions = cookTransactions;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
