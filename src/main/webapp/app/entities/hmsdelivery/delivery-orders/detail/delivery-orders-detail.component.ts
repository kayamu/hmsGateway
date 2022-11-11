import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryOrders } from '../delivery-orders.model';

@Component({
  selector: 'jhi-delivery-orders-detail',
  templateUrl: './delivery-orders-detail.component.html',
})
export class DeliveryOrdersDetailComponent implements OnInit {
  deliveryOrders: IDeliveryOrders | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryOrders }) => {
      this.deliveryOrders = deliveryOrders;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
