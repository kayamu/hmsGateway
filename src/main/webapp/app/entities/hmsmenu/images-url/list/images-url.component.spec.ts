import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ImagesUrlService } from '../service/images-url.service';

import { ImagesUrlComponent } from './images-url.component';

describe('ImagesUrl Management Component', () => {
  let comp: ImagesUrlComponent;
  let fixture: ComponentFixture<ImagesUrlComponent>;
  let service: ImagesUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'images-url', component: ImagesUrlComponent }]), HttpClientTestingModule],
      declarations: [ImagesUrlComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ImagesUrlComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ImagesUrlComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ImagesUrlService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.imagesUrls?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to imagesUrlService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getImagesUrlIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getImagesUrlIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
