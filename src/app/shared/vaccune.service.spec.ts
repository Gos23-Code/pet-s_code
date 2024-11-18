import { TestBed } from '@angular/core/testing';

import { VaccuneService } from './vaccune.service';

describe('VaccuneService', () => {
  let service: VaccuneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccuneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
