import { TestBed } from '@angular/core/testing';

import { WheaterCardService } from './wheater-card.service';

describe('WheaterCardService', () => {
  let service: WheaterCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WheaterCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
