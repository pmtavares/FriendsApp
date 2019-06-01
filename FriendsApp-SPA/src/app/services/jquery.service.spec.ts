import { TestBed } from '@angular/core/testing';

import { JqueryBootStrapService } from './jquerybootstrap.service';

describe('JqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JqueryBootStrapService = TestBed.get(JqueryBootStrapService);
    expect(service).toBeTruthy();
  });
});
