import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultingStatus } from '../consulting-status.model';

@Component({
  selector: 'jhi-consulting-status-detail',
  templateUrl: './consulting-status-detail.component.html',
})
export class ConsultingStatusDetailComponent implements OnInit {
  consultingStatus: IConsultingStatus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultingStatus }) => {
      this.consultingStatus = consultingStatus;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
