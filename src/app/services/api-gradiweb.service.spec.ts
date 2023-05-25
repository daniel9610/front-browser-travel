import { TestBed } from '@angular/core/testing';

import { ApiGradiwebService } from './api-gradiweb.service';

describe('ApiGradiwebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGradiwebService = TestBed.get(ApiGradiwebService);
    expect(service).toBeTruthy();
  });
});
