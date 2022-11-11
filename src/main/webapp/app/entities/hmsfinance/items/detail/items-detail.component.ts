import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItems } from '../items.model';

@Component({
  selector: 'jhi-items-detail',
  templateUrl: './items-detail.component.html',
})
export class ItemsDetailComponent implements OnInit {
  items: IItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ items }) => {
      this.items = items;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
