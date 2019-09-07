import {Injectable} from '@angular/core';
import {firestore, GeoFireCollectionRef, GeoFirePoint, GeoQueryDocument} from 'geofirex';
import {Geokit, LatLngLiteral} from 'geokit';
import {BehaviorSubject, Observable} from 'rxjs';

import {LocationService} from './location.service';
import {InitializedGeoFireClient} from './initialized-geo-fire-client.service';
import {take} from 'rxjs/operators';
import { IDecision, IDecisionLocation } from '../models/decision-marker.model';

@Injectable()
export class DecisionLocationsService {
  private _decisionLocationsCollection: GeoFireCollectionRef = InitializedGeoFireClient.geoFireClient.collection('locations');
  private _decisionsCollection: GeoFireCollectionRef = InitializedGeoFireClient.geoFireClient.collection('decisions');
  private _previousCoords: GeoFirePoint = InitializedGeoFireClient.geoFireClient.point(0, 0);
  private _decisionLocations: BehaviorSubject<IDecisionLocation[]> = new BehaviorSubject<IDecisionLocation[]>([]);

  constructor(private locationService: LocationService) {
    this.locationService.mapCenter.subscribe((center: GeoFirePoint) => {
      if (Geokit.distance(this._geopoint2Literal(center), this._geopoint2Literal(this._previousCoords)) > 0.5) {
        this._previousCoords = center;
        console.log('Updating Center Of Query');
        this._query(center);
      }
    });
  }

  get decisionLocations(): Observable<IDecisionLocation[]> {
    return this._decisionLocations.asObservable();
  }

  private _query(center = this._previousCoords): void {
    const query = this._decisionLocationsCollection.within(center, 1, 'point');

    query
      .pipe(take(1))
      .subscribe((geoQueryDocuments: GeoQueryDocument[]) => {
      const docs = geoQueryDocuments.map((geoQueryDocument: GeoQueryDocument) => {
        const {queryMetadata, ...rest} = geoQueryDocument;
        return {...rest} as IDecisionLocation;
      });
      console.log({docs, geoQueryDocuments});

      this._decisionLocations.next(docs);
    });
  }

  private _geopoint2Literal(coordinates: GeoFirePoint): LatLngLiteral {
    return {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };
  }
}
