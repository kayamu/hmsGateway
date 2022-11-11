import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAllergens } from '../allergens.model';

@Component({
  selector: 'jhi-allergens-detail',
  templateUrl: './allergens-detail.component.html',
})
export class AllergensDetailComponent implements OnInit {
  allergens: IAllergens | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ allergens }) => {
      this.allergens = allergens;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
