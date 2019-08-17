import {Injectable} from '@angular/core';
import * as geofirex from 'geofirex';
import {GeoFireClient} from 'geofirex';
import * as firebaseApp from 'firebase/app';
import {IDecisionMarker} from '../models/decision-marker.model';


@Injectable({
  providedIn: 'root'
})
export class InitializedGeoFireClient {

  static readonly geoFireClient: GeoFireClient = geofirex.init(firebaseApp);

  constructor() {
  }

  /**
   * @see https://angularfirebase.com/lessons/geolocation-query-in-firestore-realtime/
   * @param decisionMarker
   * @param lat
   * @param lng
   */
  static createPoint(decisionMarker: Exclude<IDecisionMarker, 'geolocations'>, lat: number, lng: number) {
    const collection = InitializedGeoFireClient.geoFireClient.collection('test');

    const point = InitializedGeoFireClient.geoFireClient.point(lat, lng);
    collection.setDoc(null, { ...decisionMarker, geolocations: [point.data] });
  }
}
