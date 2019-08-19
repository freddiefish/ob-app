import {Injectable} from '@angular/core';
import {firestore, GeoFireCollectionRef, GeoFirePoint, GeoQueryDocument} from 'geofirex';
import {Geokit, LatLngLiteral} from 'geokit';
import {BehaviorSubject, Observable} from 'rxjs';

import {LocationService} from './location.service';
import {InitializedGeoFireClient} from './initialized-geo-fire-client.service';
import {take} from 'rxjs/operators';
import {decisionMarkerSampleData, IDecision, IDecisionLocation} from '../models/decision-marker.model';

@Injectable()
export class DecisionLocationsService {
  private _decisionLocationsCollection: GeoFireCollectionRef = InitializedGeoFireClient.geoFireClient.collection('test-locations');
  private _decisionsCollection: GeoFireCollectionRef = InitializedGeoFireClient.geoFireClient.collection('test-decisions');
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
    const query = this._decisionLocationsCollection.within(center, 0.5, 'point');
    // this.generateSamplePoints();

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

  private generateSamplePoints() {
    const decisionsCollection = InitializedGeoFireClient.geoFireClient.collection('test-decisions');

    decisionMarkerSampleData.forEach(decisionMarker => {
      const decisionData = {
        background: decisionMarker.background,
        date: new Date().toUTCString(),
        decision: decisionMarker.decision,
        docId: '19.0805.1982.6385',
        fullText: decisionMarker.background,
        groupId: '19.0805.1982.6385',
        groupName: 'test name',
        published: true,
        title: decisionMarker.title,
      };
      // collection.setDoc($key, { ...rest, geolocations: points[0].data) })
      decisionsCollection.add({ ...decisionData })
        .then(decisionDocumentReference => {
          console.log({decisionDocumentReference});
          const geolocation = decisionMarker.geolocations[0];
          const point = InitializedGeoFireClient.geoFireClient.point(geolocation._lat, geolocation._long);

          const locationsCollection = InitializedGeoFireClient.geoFireClient.collection('test-locations');
          const locationData = {
            decisionRef: decisionDocumentReference,
            point: point.data,
          };
          locationsCollection.add({...locationData})
            .then(locationDocumentReference => console.log({locationDocumentReference}))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));


      /*collection.setDoc(decisionMarker.$key, { ...decisionData, geolocations: points.map(point => point.data) })
        .then(res => console.log(res))
        .catch(err => console.error(err));*/
    });
  }

  private _geopoint2Literal(coordinates: GeoFirePoint): LatLngLiteral {
    return {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };
  }
}
