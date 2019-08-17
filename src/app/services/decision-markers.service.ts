import {Injectable} from '@angular/core';
import {GeoFireCollectionRef, GeoFirePoint, GeoQueryDocument} from 'geofirex';
import {Geokit, LatLngLiteral} from 'geokit';
import {BehaviorSubject, Observable} from 'rxjs';

import {LocationService} from './location.service';
import {InitializedGeoFireClient} from './initialized-geo-fire-client.service';
import {take} from 'rxjs/operators';
import {decisionMarkerSampleData} from '../models/decision-marker.model';

@Injectable()
export class DecisionMarkersService {
  private _collection: GeoFireCollectionRef = InitializedGeoFireClient.geoFireClient.collection('test');
  private _previousCoords: GeoFirePoint = InitializedGeoFireClient.geoFireClient.point(0, 0);
  private _decisionMarkers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private locationService: LocationService) {
    this.locationService.mapCenter.subscribe((center: GeoFirePoint) => {
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
    const query = this._collection.within(center, 0.5, 'geolocations');
    // this.generateSamplePoints();

    query
      .pipe(take(1))
      .subscribe((geoQueryDocuments: GeoQueryDocument[]) => {
      /*const docs = geoQueryDocuments.map((geoQueryDocument: GeoQueryDocument) => {
        return {$key: geoQueryDocument.id, ...geoQueryDocument};
      });*/
      console.log({geoQueryDocuments});

      this._decisionMarkers.next(geoQueryDocuments);
    });
  }

  private generateSamplePoints() {
    const collection = InitializedGeoFireClient.geoFireClient.collection('test');
    decisionMarkerSampleData.forEach(item => {
      // item.date = new Date().toLocaleDateString();
      const points = item.geolocations.map(geolocation => {
        return InitializedGeoFireClient.geoFireClient.point(geolocation._lat, geolocation._long);
      });
      const {$key, ...rest} = item;
      // collection.setDoc($key, { ...rest, geolocations: points[0].data) })
      collection.setDoc($key, { ...rest, geolocations: points.map(point => point.data) })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    });
  }

  private _geopoint2Literal(coordinates: GeoFirePoint): LatLngLiteral {
    return {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };
  }
}
