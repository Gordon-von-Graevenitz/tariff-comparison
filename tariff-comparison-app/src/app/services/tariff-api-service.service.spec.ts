import { TestBed } from '@angular/core/testing';

import { TariffApiServiceService } from './tariff-api-service.service';

describe('TariffApiServiceService', () => {
  let service: TariffApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
