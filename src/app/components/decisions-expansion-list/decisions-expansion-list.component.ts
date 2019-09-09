import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IDecision } from '../../models/decision-marker.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { throttleTime, mergeMap , scan, map, tap, flatMap} from 'rxjs/operators';


@Component({
  selector: 'app-decisions-expansion-list',
  templateUrl: './decisions-expansion-list.component.html',
  styleUrls: ['./decisions-expansion-list.component.scss']
})
export class DecisionsExpansionListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, {static: false})
  viewport: CdkVirtualScrollViewport;

  batch = 20;
  theEnd = false;

  offset = new BehaviorSubject('2019-09-09T08:31:03.800623Z19.0906.8447.6787');
  infinite: Observable<any[]>;

  constructor(private db: AngularFirestore) {
   const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {} )
    );

    this.infinite = batchMap.pipe(map(v => Object.values(v)));
    console.log(this.infinite);
  }

  /* const first = this.db.collection('decisions', ref => {
    return ref
      .where('hasGeoData', '==', false) // we want to list only decsions of general interest
      .orderBy('sortIndex1', 'desc')
      .limit(1);
  }); */

  getBatch(offset) {

    console.log(offset);
  
    return this.db
      .collection('decisions', ref =>
         ref
          .where('hasGeoData', '==', false) // we want to list only decsions of general interest
          .orderBy('date', 'desc')
          .startAfter(offset)
          .limit(this.batch)
        )
        .snapshotChanges()
        .pipe(
          tap(arr => (arr.length ? null : (this.theEnd = true))),
          map(arr => {
            return arr.reduce((acc, cur) => {
              const id = cur.payload.doc.id;
              const data = cur.payload.doc.data();
              return { ...acc, [id]: data };
            }, {});
          })
        );

  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }

  ngOnInit() {
  }


}
