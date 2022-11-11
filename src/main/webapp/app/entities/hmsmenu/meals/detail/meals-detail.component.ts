import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeals } from '../meals.model';

@Component({
  selector: 'jhi-meals-detail',
  templateUrl: './meals-detail.component.html',
})
export class MealsDetailComponent implements OnInit {
  meals: IMeals | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ meals }) => {
      this.meals = meals;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
