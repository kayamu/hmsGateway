import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEpicrysis } from '../epicrysis.model';

@Component({
  selector: 'jhi-epicrysis-detail',
  templateUrl: './epicrysis-detail.component.html',
})
export class EpicrysisDetailComponent implements OnInit {
  epicrysis: IEpicrysis | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ epicrysis }) => {
      this.epicrysis = epicrysis;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
