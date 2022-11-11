import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenus } from '../menus.model';

@Component({
  selector: 'jhi-menus-detail',
  templateUrl: './menus-detail.component.html',
})
export class MenusDetailComponent implements OnInit {
  menus: IMenus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menus }) => {
      this.menus = menus;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
