import { TestBed } from '@angular/core/testing';

import { DataresumecontainerService } from './dataresumecontainer.service';

describe('DataresumecontainerService', () => {
  let service: DataresumecontainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataresumecontainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
