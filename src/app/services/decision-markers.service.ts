import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {GeoCollectionReference, GeoFirestore} from 'geofirestore';
import {Geokit, LatLngLiteral} from 'geokit';
import {BehaviorSubject, Observable} from 'rxjs';

import {LocationService} from './location.service';
import {decisionMarkerSampleData, IDecisionMarker} from '../models/decision-marker.model';

@Injectable()
export class DecisionMarkersService {
  private _collection: GeoCollectionReference = new GeoFirestore(firebase.firestore()).collection('decisions');
  private _previousCoords: firebase.firestore.GeoPoint = new firebase.firestore.GeoPoint(0, 0);
  private _decisionMarkers: BehaviorSubject<IDecisionMarker[]> = new BehaviorSubject<IDecisionMarker[]>([]);

  constructor(private locationService: LocationService) {
    this.locationService.mapCenter.subscribe((center: firebase.firestore.GeoPoint) => {
      if (Geokit.distance(this._geopoint2Literal(center), this._geopoint2Literal(this._previousCoords)) > 0.5) {
        this._previousCoords = center;
        console.log('Updating Center Of Query');
        this._query(center);
      }
    });
  }

  get decisionMarkers(): Observable<any[]> {
    return this._decisionMarkers.asObservable();
  }

  private _query(center = this._previousCoords): void {
    const query = this._collection.near({ center, radius: .5});
    // const query = this._collection.near({center});


    query.get().then((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        return {$key: doc.id, ...doc.data()};
      });
      console.log({docs});

      this._decisionMarkers.next(docs);
    });
  }

  private _geopoint2Literal(coordinates: firebase.firestore.GeoPoint): LatLngLiteral {
    return {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };
  }
}
