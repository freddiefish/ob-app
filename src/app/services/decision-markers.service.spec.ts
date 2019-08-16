import { TestBed, inject } from '@angular/core/testing';

import { DecisionMarkersService } from './decision-markers.service';

describe('DecisionMarkersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecisionMarkersService]
    });
  });

  it('should be created', inject([DecisionMarkersService], (service: DecisionMarkersService) => {
    expect(service).toBeTruthy();
  }));
});
