import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DeliveryTransactionsService } from '../service/delivery-transactions.service';

import { DeliveryTransactionsComponent } from './delivery-transactions.component';

describe('DeliveryTransactions Management Component', () => {
  let comp: DeliveryTransactionsComponent;
  let fixture: ComponentFixture<DeliveryTransactionsComponent>;
  let service: DeliveryTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'delivery-transactions', component: DeliveryTransactionsComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [DeliveryTransactionsComponent],
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
      .overrideTemplate(DeliveryTransactionsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryTransactionsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DeliveryTransactionsService);

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
    expect(comp.deliveryTransactions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to deliveryTransactionsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDeliveryTransactionsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDeliveryTransactionsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
