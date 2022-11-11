import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITemplates } from '../templates.model';

@Component({
  selector: 'jhi-templates-detail',
  templateUrl: './templates-detail.component.html',
})
export class TemplatesDetailComponent implements OnInit {
  templates: ITemplates | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templates }) => {
      this.templates = templates;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
