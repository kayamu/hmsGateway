import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConditions } from '../conditions.model';

@Component({
  selector: 'jhi-conditions-detail',
  templateUrl: './conditions-detail.component.html',
})
export class ConditionsDetailComponent implements OnInit {
  conditions: IConditions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conditions }) => {
      this.conditions = conditions;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
