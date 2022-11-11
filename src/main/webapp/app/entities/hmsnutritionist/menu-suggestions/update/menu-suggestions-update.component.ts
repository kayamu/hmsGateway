import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MenuSuggestionsFormService, MenuSuggestionsFormGroup } from './menu-suggestions-form.service';
import { IMenuSuggestions } from '../menu-suggestions.model';
import { MenuSuggestionsService } from '../service/menu-suggestions.service';

@Component({
  selector: 'jhi-menu-suggestions-update',
  templateUrl: './menu-suggestions-update.component.html',
})
export class MenuSuggestionsUpdateComponent implements OnInit {
  isSaving = false;
  menuSuggestions: IMenuSuggestions | null = null;

  editForm: MenuSuggestionsFormGroup = this.menuSuggestionsFormService.createMenuSuggestionsFormGroup();

  constructor(
    protected menuSuggestionsService: MenuSuggestionsService,
    protected menuSuggestionsFormService: MenuSuggestionsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuSuggestions }) => {
      this.menuSuggestions = menuSuggestions;
      if (menuSuggestions) {
        this.updateForm(menuSuggestions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menuSuggestions = this.menuSuggestionsFormService.getMenuSuggestions(this.editForm);
    if (menuSuggestions.id !== null) {
      this.subscribeToSaveResponse(this.menuSuggestionsService.update(menuSuggestions));
    } else {
      this.subscribeToSaveResponse(this.menuSuggestionsService.create(menuSuggestions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuSuggestions>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(menuSuggestions: IMenuSuggestions): void {
    this.menuSuggestions = menuSuggestions;
    this.menuSuggestionsFormService.resetForm(this.editForm, menuSuggestions);
  }
}
