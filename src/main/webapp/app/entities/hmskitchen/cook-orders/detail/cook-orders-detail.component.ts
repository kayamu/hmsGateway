import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICookOrders } from '../cook-orders.model';

@Component({
  selector: 'jhi-cook-orders-detail',
  templateUrl: './cook-orders-detail.component.html',
})
export class CookOrdersDetailComponent implements OnInit {
  cookOrders: ICookOrders | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cookOrders }) => {
      this.cookOrders = cookOrders;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
