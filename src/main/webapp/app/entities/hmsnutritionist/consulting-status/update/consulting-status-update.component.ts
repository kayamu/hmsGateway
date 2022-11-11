import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ConsultingStatusFormService, ConsultingStatusFormGroup } from './consulting-status-form.service';
import { IConsultingStatus } from '../consulting-status.model';
import { ConsultingStatusService } from '../service/consulting-status.service';
import { STATUS } from 'app/entities/enumerations/status.model';

@Component({
  selector: 'jhi-consulting-status-update',
  templateUrl: './consulting-status-update.component.html',
})
export class ConsultingStatusUpdateComponent implements OnInit {
  isSaving = false;
  consultingStatus: IConsultingStatus | null = null;
  sTATUSValues = Object.keys(STATUS);

  editForm: ConsultingStatusFormGroup = this.consultingStatusFormService.createConsultingStatusFormGroup();

  constructor(
    protected consultingStatusService: ConsultingStatusService,
    protected consultingStatusFormService: ConsultingStatusFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultingStatus }) => {
      this.consultingStatus = consultingStatus;
      if (consultingStatus) {
        this.updateForm(consultingStatus);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consultingStatus = this.consultingStatusFormService.getConsultingStatus(this.editForm);
    if (consultingStatus.id !== null) {
      this.subscribeToSaveResponse(this.consultingStatusService.update(consultingStatus));
    } else {
      this.subscribeToSaveResponse(this.consultingStatusService.create(consultingStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsultingStatus>>): void {
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

  protected updateForm(consultingStatus: IConsultingStatus): void {
    this.consultingStatus = consultingStatus;
    this.consultingStatusFormService.resetForm(this.editForm, consultingStatus);
  }
}
