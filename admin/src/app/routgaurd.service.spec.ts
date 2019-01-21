import { TestBed, inject } from '@angular/core/testing';

import { RoutgaurdService } from './routgaurd.service';

describe('RoutgaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutgaurdService]
    });
  });

  it('should be created', inject([RoutgaurdService], (service: RoutgaurdService) => {
    expect(service).toBeTruthy();
  }));
});
