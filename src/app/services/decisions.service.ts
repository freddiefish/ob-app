import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDecision } from '../models/decision-marker.model';
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DecisionsService {

  constructor(
    private db: AngularFirestore) { }


  public getAllDecisions(): Observable<IDecision[]> {

      const query = this.db.collection<IDecision>(
        'decisions',
        ref => ref.where('hasGeoData', '==', true)
                  .limit(20)
                  .orderBy('date', 'desc'));

      return query
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
        );
  }

  public getDecision(docId: string): Observable<IDecision[]> {
    const query = this.db.collection<IDecision>(
      'decisions',
      ref => ref.where('docId', '==', docId)
                );

    return query
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );

  }

}



