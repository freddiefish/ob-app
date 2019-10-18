import {Component, Input, OnInit} from '@angular/core';
import {createDecision, IDecision, IDecisionLocation} from '../../models/decision-marker.model';
import {firestore} from 'geofirex';
import {MatDialogRef} from '@angular/material';
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
  decisionsInThisLocation$: Observable<IDecision[]>;

  private _decisionLocation: IDecisionLocation = null;

  @Input() set decisionLocation(decisionLocation: IDecisionLocation) {
    this._decisionLocation = decisionLocation;
    // this.setDecisionByDecisionRef(decisionLocation.decisionRef);
    if (this.allDecisionLocations) {
      this.setDecisionsInThisLocation(decisionLocation);
    }
  }

  get decisionLocation() {
    return this._decisionLocation;
  }

  private _allDecisionLocations: IDecisionLocation[] = [];

  @Input() set allDecisionLocations(locations: IDecisionLocation[]) {
    this._allDecisionLocations = locations;
    if (this.decisionLocation) {
      this.setDecisionsInThisLocation(this.decisionLocation);
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
      .then(documentSnapshot => {
        const data = {id: documentSnapshot.id, ...documentSnapshot.data()};
        this.decision = data ? createDecision(data as IDecision) : null;
      })
      .catch(err => console.error(err));
  }

  setDecision(decision: IDecision) {
    this.decision = decision;
  }

  closeModal() {
    this.dialogRef.close();
  }

  private setDecisionsInThisLocation(decisionLocation: IDecisionLocation) {

    const decisionRefs$ = this.allDecisionLocations
      .filter(item => {
        return (item.point.geohash === decisionLocation.point.geohash);
      })
      .map(location => {
        return fromPromise(location.decisionRef.get());
      });

    this.decisionsInThisLocation$ = combineLatest(decisionRefs$)
      .pipe(
        map((documentSnapshots) => {
          return documentSnapshots
            .map(documentSnapshot => {
              const documentData = documentSnapshot.data();
              // only create a decision object if there's the required decision data in the retrieved document
              return documentData ? createDecision({id: documentSnapshot.id, ...documentData} as IDecision) : null;
            })
            .filter(decision => decision !== null)
            .sort((current, next) => {
              if ( current.date > next.date ) {
                return -1;
              }
              if ( current.date < next.date ) {
                return 1;
              }
              return 0;
            });
        }),
        tap(decisions => {
          this.decision = decisions[0];
        }),
      );
  }
  askFullText() {
    
  }
}
