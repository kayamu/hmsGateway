import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecipies } from '../recipies.model';

@Component({
  selector: 'jhi-recipies-detail',
  templateUrl: './recipies-detail.component.html',
})
export class RecipiesDetailComponent implements OnInit {
  recipies: IRecipies | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recipies }) => {
      this.recipies = recipies;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
