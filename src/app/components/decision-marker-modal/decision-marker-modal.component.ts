import {Component, Input, OnInit} from '@angular/core';
import {IDecision, IDecisionLocation} from '../../models/decision-marker.model';
import {firestore} from 'geofirex';
import {MatDialog, MatDialogRef} from '@angular/material';
import {fromPromise} from 'rxjs/internal-compatibility';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-decision-marker-modal',
  templateUrl: './decision-marker-modal.component.html',
  styleUrls: ['./decision-marker-modal.component.scss']
})
export class DecisionMarkerModalComponent implements OnInit {

  decision: IDecision;
  otherDecisionsInThisLocation$: Observable<IDecision[]>;

  private _decisionLocation: IDecisionLocation = null;
  @Input() set decisionLocation(decisionLocation: IDecisionLocation) {
    this._decisionLocation = decisionLocation;
    this.setDecisionByDecisionRef(decisionLocation.decisionRef);
    if (this.allDecisionLocations) {
      this.setOtherDecisionsInThisLocation(decisionLocation);
    }
  }
  get decisionLocation() {
    return this._decisionLocation;
  }

  private _allDecisionLocations: IDecisionLocation[] = [];
  @Input() set allDecisionLocations(locations: IDecisionLocation[]) {
    this._allDecisionLocations = locations;
    if (this.decisionLocation) {
      this.setOtherDecisionsInThisLocation(this.decisionLocation);
    }
  }
  get allDecisionLocations() {
    return this._allDecisionLocations;
  }

  constructor(private dialogRef: MatDialogRef<DecisionMarkerModalComponent>) { }

  ngOnInit() {
  }

  setDecisionByDecisionRef(decisionRef: firestore.DocumentReference) {
    decisionRef.get()
      .then(documentSnapshot => this.decision = documentSnapshot.data() as IDecision)
      .catch(err => console.error(err));
  }

  setDecision(decision: IDecision) {
    this.decision = decision;
  }

  closeModal() {
    this.dialogRef.close();
  }

  private setOtherDecisionsInThisLocation(decisionLocation: IDecisionLocation) {
    // const decisions: IDecision[] = [];
    /*const decisionRefs = this.allDecisionLocations
        .filter(decision => {
          return decision.point.geohash === decisionLocation.point.geohash;
        })
        .forEach(location => {
          location.decisionRef.get()
            .then(documentSnapshot => {
              decisions.push(documentSnapshot.data() as IDecision);
            });
        });*/
    const decisionRefs$ = this.allDecisionLocations
      .filter(decision => {
        return decision.point.geohash === decisionLocation.point.geohash;
      })
      .map(location => {
        return fromPromise(location.decisionRef.get());
      });
    this.otherDecisionsInThisLocation$ = combineLatest(decisionRefs$)
      .pipe(
        map((documentSnapshots) => {
          return documentSnapshots.map(documentSnapshot => {
            return documentSnapshot.data() as IDecision;
          });
        }),
        // tap(res => console.log({otherDecisions: res}))
      );
  }
}
