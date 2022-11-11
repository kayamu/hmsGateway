import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TemplatesService } from '../service/templates.service';

import { TemplatesComponent } from './templates.component';

describe('Templates Management Component', () => {
  let comp: TemplatesComponent;
  let fixture: ComponentFixture<TemplatesComponent>;
  let service: TemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'templates', component: TemplatesComponent }]), HttpClientTestingModule],
      declarations: [TemplatesComponent],
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
      .overrideTemplate(TemplatesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TemplatesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TemplatesService);

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
    expect(comp.templates?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to templatesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTemplatesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTemplatesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
