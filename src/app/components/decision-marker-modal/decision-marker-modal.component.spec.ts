import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionMarkerModalComponent } from './decision-marker-modal.component';

describe('DecisionMarkerModalComponent', () => {
  let component: DecisionMarkerModalComponent;
  let fixture: ComponentFixture<DecisionMarkerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionMarkerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionMarkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
