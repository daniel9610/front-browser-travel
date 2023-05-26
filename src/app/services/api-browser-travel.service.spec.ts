import { TestBed } from '@angular/core/testing';

import { ApiBrowserTravelService } from './api-browser-travel.service';

describe('ApiBrowserTravelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiBrowserTravelService = TestBed.get(ApiBrowserTravelService);
    expect(service).toBeTruthy();
  });
});
