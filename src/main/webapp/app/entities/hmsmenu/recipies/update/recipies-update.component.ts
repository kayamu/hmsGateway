import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RecipiesFormService, RecipiesFormGroup } from './recipies-form.service';
import { IRecipies } from '../recipies.model';
import { RecipiesService } from '../service/recipies.service';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';

@Component({
  selector: 'jhi-recipies-update',
  templateUrl: './recipies-update.component.html',
})
export class RecipiesUpdateComponent implements OnInit {
  isSaving = false;
  recipies: IRecipies | null = null;

  imagesUrlsSharedCollection: IImagesUrl[] = [];

  editForm: RecipiesFormGroup = this.recipiesFormService.createRecipiesFormGroup();

  constructor(
    protected recipiesService: RecipiesService,
    protected recipiesFormService: RecipiesFormService,
    protected imagesUrlService: ImagesUrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareImagesUrl = (o1: IImagesUrl | null, o2: IImagesUrl | null): boolean => this.imagesUrlService.compareImagesUrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recipies }) => {
      this.recipies = recipies;
      if (recipies) {
        this.updateForm(recipies);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recipies = this.recipiesFormService.getRecipies(this.editForm);
    if (recipies.id !== null) {
      this.subscribeToSaveResponse(this.recipiesService.update(recipies));
    } else {
      this.subscribeToSaveResponse(this.recipiesService.create(recipies));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipies>>): void {
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

  protected updateForm(recipies: IRecipies): void {
    this.recipies = recipies;
    this.recipiesFormService.resetForm(this.editForm, recipies);

    this.imagesUrlsSharedCollection = this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(
      this.imagesUrlsSharedCollection,
      ...(recipies.imagesUrls ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.imagesUrlService
      .query()
      .pipe(map((res: HttpResponse<IImagesUrl[]>) => res.body ?? []))
      .pipe(
        map((imagesUrls: IImagesUrl[]) =>
          this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(imagesUrls, ...(this.recipies?.imagesUrls ?? []))
        )
      )
      .subscribe((imagesUrls: IImagesUrl[]) => (this.imagesUrlsSharedCollection = imagesUrls));
  }
}
