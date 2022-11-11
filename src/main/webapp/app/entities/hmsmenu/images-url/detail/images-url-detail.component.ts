import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImagesUrl } from '../images-url.model';

@Component({
  selector: 'jhi-images-url-detail',
  templateUrl: './images-url-detail.component.html',
})
export class ImagesUrlDetailComponent implements OnInit {
  imagesUrl: IImagesUrl | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imagesUrl }) => {
      this.imagesUrl = imagesUrl;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
