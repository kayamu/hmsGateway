import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuSuggestions } from '../menu-suggestions.model';

@Component({
  selector: 'jhi-menu-suggestions-detail',
  templateUrl: './menu-suggestions-detail.component.html',
})
export class MenuSuggestionsDetailComponent implements OnInit {
  menuSuggestions: IMenuSuggestions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuSuggestions }) => {
      this.menuSuggestions = menuSuggestions;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
