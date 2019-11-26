import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsExpansionListComponent } from './decisions-expansion-list.component';

describe('DecisionsExpansionListComponent', () => {
  let component: DecisionsExpansionListComponent;
  let fixture: ComponentFixture<DecisionsExpansionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionsExpansionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsExpansionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
