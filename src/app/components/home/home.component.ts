import {Component, OnDestroy, OnInit} from '@angular/core';
import {DecisionMarkerModalComponent} from '../decision-marker-modal/decision-marker-modal.component';
import {IDecisionMarkerSelected} from '../../models/decision-marker-selected.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private alive = true;
  // @ViewChild(DecisionMarkerModalComponent, {static: true}) decisionMarkerModal: DecisionMarkerModalComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openStreetView($event: IDecisionMarkerSelected) {
    // this.decisionMarkerModal.decisionLocation = $event.selectedDecisionLocation;
    // this.decisionMarkerModal.allDecisionLocations = $event.allDecisionLocations;
    //
    // this.modalService.open(this.decisionMarkerModal.modalId);

    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DecisionMarkerModalComponent, {});
    dialogRef.afterOpened()
      .pipe(
        takeWhile(_ => this.alive),
      )
      .subscribe(() => {
        dialogRef.componentInstance.decisionLocation = $event.selectedDecisionLocation;
        dialogRef.componentInstance.allDecisionLocations = $event.allDecisionLocations;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
