import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionMarkersMapComponent } from './decision-markers-map.component';

describe('DecisionMarkersMapComponent', () => {
  let component: DecisionMarkersMapComponent;
  let fixture: ComponentFixture<DecisionMarkersMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionMarkersMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionMarkersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
