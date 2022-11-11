import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ConsultingsFormService, ConsultingsFormGroup } from './consultings-form.service';
import { IConsultings } from '../consultings.model';
import { ConsultingsService } from '../service/consultings.service';
import { IEpicrysis } from 'app/entities/hmsnutritionist/epicrysis/epicrysis.model';
import { EpicrysisService } from 'app/entities/hmsnutritionist/epicrysis/service/epicrysis.service';
import { IMenuSuggestions } from 'app/entities/hmsnutritionist/menu-suggestions/menu-suggestions.model';
import { MenuSuggestionsService } from 'app/entities/hmsnutritionist/menu-suggestions/service/menu-suggestions.service';
import { IConsultingStatus } from 'app/entities/hmsnutritionist/consulting-status/consulting-status.model';
import { ConsultingStatusService } from 'app/entities/hmsnutritionist/consulting-status/service/consulting-status.service';
import { STATUS } from 'app/entities/enumerations/status.model';

@Component({
  selector: 'jhi-consultings-update',
  templateUrl: './consultings-update.component.html',
})
export class ConsultingsUpdateComponent implements OnInit {
  isSaving = false;
  consultings: IConsultings | null = null;
  sTATUSValues = Object.keys(STATUS);

  epicrysesSharedCollection: IEpicrysis[] = [];
  menuSuggestionsSharedCollection: IMenuSuggestions[] = [];
  consultingStatusesSharedCollection: IConsultingStatus[] = [];

  editForm: ConsultingsFormGroup = this.consultingsFormService.createConsultingsFormGroup();

  constructor(
    protected consultingsService: ConsultingsService,
    protected consultingsFormService: ConsultingsFormService,
    protected epicrysisService: EpicrysisService,
    protected menuSuggestionsService: MenuSuggestionsService,
    protected consultingStatusService: ConsultingStatusService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEpicrysis = (o1: IEpicrysis | null, o2: IEpicrysis | null): boolean => this.epicrysisService.compareEpicrysis(o1, o2);

  compareMenuSuggestions = (o1: IMenuSuggestions | null, o2: IMenuSuggestions | null): boolean =>
    this.menuSuggestionsService.compareMenuSuggestions(o1, o2);

  compareConsultingStatus = (o1: IConsultingStatus | null, o2: IConsultingStatus | null): boolean =>
    this.consultingStatusService.compareConsultingStatus(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultings }) => {
      this.consultings = consultings;
      if (consultings) {
        this.updateForm(consultings);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consultings = this.consultingsFormService.getConsultings(this.editForm);
    if (consultings.id !== null) {
      this.subscribeToSaveResponse(this.consultingsService.update(consultings));
    } else {
      this.subscribeToSaveResponse(this.consultingsService.create(consultings));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsultings>>): void {
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

  protected updateForm(consultings: IConsultings): void {
    this.consultings = consultings;
    this.consultingsFormService.resetForm(this.editForm, consultings);

    this.epicrysesSharedCollection = this.epicrysisService.addEpicrysisToCollectionIfMissing<IEpicrysis>(
      this.epicrysesSharedCollection,
      ...(consultings.epicryses ?? [])
    );
    this.menuSuggestionsSharedCollection = this.menuSuggestionsService.addMenuSuggestionsToCollectionIfMissing<IMenuSuggestions>(
      this.menuSuggestionsSharedCollection,
      ...(consultings.menuSuggestions ?? [])
    );
    this.consultingStatusesSharedCollection = this.consultingStatusService.addConsultingStatusToCollectionIfMissing<IConsultingStatus>(
      this.consultingStatusesSharedCollection,
      consultings.consultingStatus
    );
  }

  protected loadRelationshipsOptions(): void {
    this.epicrysisService
      .query()
      .pipe(map((res: HttpResponse<IEpicrysis[]>) => res.body ?? []))
      .pipe(
        map((epicryses: IEpicrysis[]) =>
          this.epicrysisService.addEpicrysisToCollectionIfMissing<IEpicrysis>(epicryses, ...(this.consultings?.epicryses ?? []))
        )
      )
      .subscribe((epicryses: IEpicrysis[]) => (this.epicrysesSharedCollection = epicryses));

    this.menuSuggestionsService
      .query()
      .pipe(map((res: HttpResponse<IMenuSuggestions[]>) => res.body ?? []))
      .pipe(
        map((menuSuggestions: IMenuSuggestions[]) =>
          this.menuSuggestionsService.addMenuSuggestionsToCollectionIfMissing<IMenuSuggestions>(
            menuSuggestions,
            ...(this.consultings?.menuSuggestions ?? [])
          )
        )
      )
      .subscribe((menuSuggestions: IMenuSuggestions[]) => (this.menuSuggestionsSharedCollection = menuSuggestions));

    this.consultingStatusService
      .query()
      .pipe(map((res: HttpResponse<IConsultingStatus[]>) => res.body ?? []))
      .pipe(
        map((consultingStatuses: IConsultingStatus[]) =>
          this.consultingStatusService.addConsultingStatusToCollectionIfMissing<IConsultingStatus>(
            consultingStatuses,
            this.consultings?.consultingStatus
          )
        )
      )
      .subscribe((consultingStatuses: IConsultingStatus[]) => (this.consultingStatusesSharedCollection = consultingStatuses));
  }
}
