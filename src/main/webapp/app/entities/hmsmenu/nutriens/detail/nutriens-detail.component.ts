import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INutriens } from '../nutriens.model';

@Component({
  selector: 'jhi-nutriens-detail',
  templateUrl: './nutriens-detail.component.html',
})
export class NutriensDetailComponent implements OnInit {
  nutriens: INutriens | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nutriens }) => {
      this.nutriens = nutriens;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
