import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CookTransactionsService } from '../service/cook-transactions.service';

import { CookTransactionsComponent } from './cook-transactions.component';

describe('CookTransactions Management Component', () => {
  let comp: CookTransactionsComponent;
  let fixture: ComponentFixture<CookTransactionsComponent>;
  let service: CookTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'cook-transactions', component: CookTransactionsComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [CookTransactionsComponent],
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
      .overrideTemplate(CookTransactionsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CookTransactionsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CookTransactionsService);

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
    expect(comp.cookTransactions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to cookTransactionsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCookTransactionsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCookTransactionsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
