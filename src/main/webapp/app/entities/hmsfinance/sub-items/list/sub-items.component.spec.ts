import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SubItemsService } from '../service/sub-items.service';

import { SubItemsComponent } from './sub-items.component';

describe('SubItems Management Component', () => {
  let comp: SubItemsComponent;
  let fixture: ComponentFixture<SubItemsComponent>;
  let service: SubItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'sub-items', component: SubItemsComponent }]), HttpClientTestingModule],
      declarations: [SubItemsComponent],
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
      .overrideTemplate(SubItemsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubItemsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SubItemsService);

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
    expect(comp.subItems?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to subItemsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSubItemsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSubItemsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
