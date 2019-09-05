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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openStreetView($event: IDecisionMarkerSelected) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';

    const dialogRef = this.dialog.open(DecisionMarkerModalComponent, dialogConfig);

    dialogRef.afterOpened()
      .pipe(
        takeWhile(_ => this.alive),
      )
      .subscribe(() => {
        dialogRef.componentInstance.allDecisionLocations = $event.allDecisionLocations;
        dialogRef.componentInstance.decisionLocation = $event.selectedDecisionLocation;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
