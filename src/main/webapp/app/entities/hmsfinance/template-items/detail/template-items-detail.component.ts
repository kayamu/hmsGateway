import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITemplateItems } from '../template-items.model';

@Component({
  selector: 'jhi-template-items-detail',
  templateUrl: './template-items-detail.component.html',
})
export class TemplateItemsDetailComponent implements OnInit {
  templateItems: ITemplateItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templateItems }) => {
      this.templateItems = templateItems;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
