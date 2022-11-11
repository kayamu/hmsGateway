import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultings } from '../consultings.model';

@Component({
  selector: 'jhi-consultings-detail',
  templateUrl: './consultings-detail.component.html',
})
export class ConsultingsDetailComponent implements OnInit {
  consultings: IConsultings | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultings }) => {
      this.consultings = consultings;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
