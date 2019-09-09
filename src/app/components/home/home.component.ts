import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {DecisionMarkerModalComponent} from '../decision-marker-modal/decision-marker-modal.component';
import {IDecisionMarkerSelected} from '../../models/decision-marker-selected.model';
import {IDecision} from '../../models/decision-marker.model';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  private alive = true;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) public defaultOptions: any) { }

  ngOnInit() {
  }

  openStreetView($event: IDecisionMarkerSelected) {

<<<<<<< HEAD
    const dialogConfig = new MatDialogConfig();

    dialogConfig.height = '100vh';
    dialogConfig.maxWidth = '100vw';

    const dialogRef = this.dialog.open(DecisionMarkerModalComponent, dialogConfig);
=======
    const dialogLocationRef = this.dialog.open(DecisionMarkerModalComponent, this.defaultOptions);
>>>>>>> dev

    dialogLocationRef.afterOpened()
      .pipe(
        takeWhile(_ => this.alive),
      )
      .subscribe(() => {
        dialogLocationRef.componentInstance.allDecisionLocations = $event.allDecisionLocations;
        dialogLocationRef.componentInstance.decisionLocation = $event.selectedDecisionLocation;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
