import { TestBed } from '@angular/core/testing';

import { ServiceGroupService } from './service-group.service';

describe('ServiceGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceGroupService = TestBed.get(ServiceGroupService);
    expect(service).toBeTruthy();
  });
});
