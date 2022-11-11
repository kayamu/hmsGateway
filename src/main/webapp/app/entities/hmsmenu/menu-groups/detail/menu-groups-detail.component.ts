import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuGroups } from '../menu-groups.model';

@Component({
  selector: 'jhi-menu-groups-detail',
  templateUrl: './menu-groups-detail.component.html',
})
export class MenuGroupsDetailComponent implements OnInit {
  menuGroups: IMenuGroups | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuGroups }) => {
      this.menuGroups = menuGroups;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
