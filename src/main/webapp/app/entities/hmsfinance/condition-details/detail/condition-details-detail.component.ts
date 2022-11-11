import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConditionDetails } from '../condition-details.model';

@Component({
  selector: 'jhi-condition-details-detail',
  templateUrl: './condition-details-detail.component.html',
})
export class ConditionDetailsDetailComponent implements OnInit {
  conditionDetails: IConditionDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conditionDetails }) => {
      this.conditionDetails = conditionDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
