import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealIngredients } from '../meal-ingredients.model';

@Component({
  selector: 'jhi-meal-ingredients-detail',
  templateUrl: './meal-ingredients-detail.component.html',
})
export class MealIngredientsDetailComponent implements OnInit {
  mealIngredients: IMealIngredients | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mealIngredients }) => {
      this.mealIngredients = mealIngredients;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
