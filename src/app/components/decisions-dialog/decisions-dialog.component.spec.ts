import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsDialogComponent } from './decisions-dialog.component';

describe('DecisionsDialogComponent', () => {
  let component: DecisionsDialogComponent;
  let fixture: ComponentFixture<DecisionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
