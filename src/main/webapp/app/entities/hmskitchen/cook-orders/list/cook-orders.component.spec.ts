import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CookOrdersService } from '../service/cook-orders.service';

import { CookOrdersComponent } from './cook-orders.component';

describe('CookOrders Management Component', () => {
  let comp: CookOrdersComponent;
  let fixture: ComponentFixture<CookOrdersComponent>;
  let service: CookOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'cook-orders', component: CookOrdersComponent }]), HttpClientTestingModule],
      declarations: [CookOrdersComponent],
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
      .overrideTemplate(CookOrdersComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CookOrdersComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CookOrdersService);

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
    expect(comp.cookOrders?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to cookOrdersService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCookOrdersIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCookOrdersIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
