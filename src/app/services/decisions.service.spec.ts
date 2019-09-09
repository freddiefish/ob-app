import { TestBed } from '@angular/core/testing';

import { DecisionsService } from './decisions.service';

describe('DecisionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecisionsService = TestBed.get(DecisionsService);
    expect(service).toBeTruthy();
  });
});
