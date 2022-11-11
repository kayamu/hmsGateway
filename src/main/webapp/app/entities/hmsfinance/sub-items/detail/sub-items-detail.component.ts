import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubItems } from '../sub-items.model';

@Component({
  selector: 'jhi-sub-items-detail',
  templateUrl: './sub-items-detail.component.html',
})
export class SubItemsDetailComponent implements OnInit {
  subItems: ISubItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subItems }) => {
      this.subItems = subItems;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
