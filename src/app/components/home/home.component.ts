import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {DecisionMarkerModalComponent} from '../decision-marker-modal/decision-marker-modal.component';
import {IDecisionMarkerSelected} from '../../models/decision-marker-selected.model';
import {IDecision} from '../../models/decision-marker.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  private alive = true;

  constructor(
    public dialog: MatDialog
    ) { }

  ngOnInit() {
  }

  openStreetView($event: IDecisionMarkerSelected) {

    const dialogLocationRef = this.dialog.open(DecisionMarkerModalComponent, {
      maxHeight: '100vh',
      maxWidth: '100vw'
    });

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
