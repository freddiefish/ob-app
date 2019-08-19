import { TestBed, inject } from '@angular/core/testing';

import { DecisionLocationsService } from './decision-locations.service';

describe('DecisionLocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecisionLocationsService]
    });
  });

  it('should be created', inject([DecisionLocationsService], (service: DecisionLocationsService) => {
    expect(service).toBeTruthy();
  }));
});
