import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ImagesUrlFormService, ImagesUrlFormGroup } from './images-url-form.service';
import { IImagesUrl } from '../images-url.model';
import { ImagesUrlService } from '../service/images-url.service';
import { IMAGETYPES } from 'app/entities/enumerations/imagetypes.model';

@Component({
  selector: 'jhi-images-url-update',
  templateUrl: './images-url-update.component.html',
})
export class ImagesUrlUpdateComponent implements OnInit {
  isSaving = false;
  imagesUrl: IImagesUrl | null = null;
  iMAGETYPESValues = Object.keys(IMAGETYPES);

  editForm: ImagesUrlFormGroup = this.imagesUrlFormService.createImagesUrlFormGroup();

  constructor(
    protected imagesUrlService: ImagesUrlService,
    protected imagesUrlFormService: ImagesUrlFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imagesUrl }) => {
      this.imagesUrl = imagesUrl;
      if (imagesUrl) {
        this.updateForm(imagesUrl);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const imagesUrl = this.imagesUrlFormService.getImagesUrl(this.editForm);
    if (imagesUrl.id !== null) {
      this.subscribeToSaveResponse(this.imagesUrlService.update(imagesUrl));
    } else {
      this.subscribeToSaveResponse(this.imagesUrlService.create(imagesUrl));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImagesUrl>>): void {
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

  protected updateForm(imagesUrl: IImagesUrl): void {
    this.imagesUrl = imagesUrl;
    this.imagesUrlFormService.resetForm(this.editForm, imagesUrl);
  }
}
