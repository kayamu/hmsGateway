import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EpicrysisFormService, EpicrysisFormGroup } from './epicrysis-form.service';
import { IEpicrysis } from '../epicrysis.model';
import { EpicrysisService } from '../service/epicrysis.service';

@Component({
  selector: 'jhi-epicrysis-update',
  templateUrl: './epicrysis-update.component.html',
})
export class EpicrysisUpdateComponent implements OnInit {
  isSaving = false;
  epicrysis: IEpicrysis | null = null;

  editForm: EpicrysisFormGroup = this.epicrysisFormService.createEpicrysisFormGroup();

  constructor(
    protected epicrysisService: EpicrysisService,
    protected epicrysisFormService: EpicrysisFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ epicrysis }) => {
      this.epicrysis = epicrysis;
      if (epicrysis) {
        this.updateForm(epicrysis);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const epicrysis = this.epicrysisFormService.getEpicrysis(this.editForm);
    if (epicrysis.id !== null) {
      this.subscribeToSaveResponse(this.epicrysisService.update(epicrysis));
    } else {
      this.subscribeToSaveResponse(this.epicrysisService.create(epicrysis));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEpicrysis>>): void {
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

  protected updateForm(epicrysis: IEpicrysis): void {
    this.epicrysis = epicrysis;
    this.epicrysisFormService.resetForm(this.editForm, epicrysis);
  }
}
