import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDecision } from '../models/decision-marker.model';
import { first, map } from 'rxjs/operators';
import { convertSnaps } from '../services/db-utils';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DecisionsService {

  constructor(
    private db: AngularFirestore) { }

  getAllDecisions(): Observable<IDecision[]> {
    return this.db.collection(
      'decisions',
        ref => ref.limit(10)
      )
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<IDecision>(snaps)),
        first());

  }



  /* getAllDecisions(): Observable<IDecision[]> {
    return this.db.collection(
      'decisions',
      ref => ref.where('hasGeoData', '==', true)
            .limit(10)
            .orderBy('date'))
      .snapshotChanges()
      .pipe(map(snaps => {
          return snaps.map(snap => {
            return <IDecision>{
                id: snap.payload.doc.id,
                ... snap.payload.doc.data()
            };
          });
       }),
        first());
        // console.log({docs});
    }

  } */

}

