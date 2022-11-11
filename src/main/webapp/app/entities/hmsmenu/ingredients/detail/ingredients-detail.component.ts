import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIngredients } from '../ingredients.model';

@Component({
  selector: 'jhi-ingredients-detail',
  templateUrl: './ingredients-detail.component.html',
})
export class IngredientsDetailComponent implements OnInit {
  ingredients: IIngredients | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ingredients }) => {
      this.ingredients = ingredients;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
