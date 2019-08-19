import {Component, Input, OnInit} from '@angular/core';
import {IDecision, IDecisionLocation} from '../../models/decision-marker.model';
import {firestore} from 'geofirex';
import {MatDialogRef} from '@angular/material';
import {fromPromise} from 'rxjs/internal-compatibility';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
    const decisionRefs$ = this.allDecisionLocations
      .filter(item => {
        return (item.point.geohash === decisionLocation.point.geohash) && (item.id !== decisionLocation.id);
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
      );
  }
}
