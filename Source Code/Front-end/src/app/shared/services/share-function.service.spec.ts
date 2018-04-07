import { TestBed, inject } from '@angular/core/testing';

import { ShareFunctionService } from './share-function.service';

describe('ShareFunctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareFunctionService]
    });
  });

  it('should be created', inject([ShareFunctionService], (service: ShareFunctionService) => {
    expect(service).toBeTruthy();
  }));
});
