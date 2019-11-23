import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LatLngLiteral} from '@agm/core';
import {GeoFirePoint} from 'geofirex';
import {InitializedGeoFireClient} from './initialized-geo-fire-client.service';
import { MatDialog } from '@angular/material';
import { NotifyDialogComponent } from '../components/notify-dialog/notify-dialog.component';


@Injectable()
export class LocationService {
  private _coordinates: BehaviorSubject<GeoFirePoint> = new BehaviorSubject<GeoFirePoint>(
    InitializedGeoFireClient.geoFireClient.point(0, 0)
  );
  private _locationWatch: number;
  private _mapCenter: BehaviorSubject<GeoFirePoint> = new BehaviorSubject<GeoFirePoint>(
    InitializedGeoFireClient.geoFireClient.point(0, 0)
  );
  private _watching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _updating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private dialog: MatDialog
  ) {
    this._getLocation();
  }

  get coordinates(): Observable<GeoFirePoint> {
    return this._coordinates.asObservable();
  }

  get mapCenter(): Observable<GeoFirePoint> {
    return this._mapCenter.asObservable();
  }

  get updating(): Observable<any> {
    return this._updating.asObservable();
  }

  get watching(): Observable<any> {
    return this._watching.asObservable();
  }

  private _getLocation(): void {
    this.notifyLocationUse();
  }

  notifyLocationUse() {
    if (!localStorage.getItem('notifiedLocationUse')) {
      this.showDialogLocationUse();
    } else {
      this.getCurrentPosition();
    }
  }

  showDialogLocationUse() {
    const dialogNotifyLocUse = this.dialog.open(NotifyDialogComponent , {
      height: '220px',
      width: '300px',
    });

    dialogNotifyLocUse.afterClosed()
    .subscribe(result => {
      console.log('Dialog result: ', result);
      if (result) {
        localStorage.setItem('notifiedLocationUse', 'true');
        this.getCurrentPosition();
      }
    });
  }

  private getCurrentPosition() {
    if ((typeof window !== 'undefined') && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((success: any) => {
        this._coordinates.next(InitializedGeoFireClient.geoFireClient.point(success.coords.latitude, success.coords.longitude));
        this.watchStart();
      }, (error: any) => {
        console.log('ERROR(' + error.code + '): ' + error.message);
      });
    }
  }

  public updateMapCenter(coordinates: GeoFirePoint): void {
    this._mapCenter.next(coordinates);
  }

  public updatingStart(): void {
    this._mapCenter.next(this._coordinates.value);
    this._updating.next(true);
  }

  public updatingStop(): void {
    this._updating.next(false);
  }

  public watchStart(): void {
    if ((typeof window !== 'undefined') && ('geolocation' in navigator) && !this._locationWatch) {
      this._locationWatch = navigator.geolocation.watchPosition((success: any) => {
        this._coordinates.next(InitializedGeoFireClient.geoFireClient.point(success.coords.latitude, success.coords.longitude));
        if (this._updating.value) { this._mapCenter.next(this._coordinates.value); }
      }, (error: any) => {
        console.warn('ERROR(' + error.code + '): ' + error.message);
      }, { enableHighAccuracy: true, timeout: 500000, maximumAge: 1 });
      this._watching.next(true);
      this._updating.next(true);
    }
  }

  public watchStop(): void {
    if ((typeof window !== 'undefined') && ('geolocation' in navigator) && this._locationWatch) {
      navigator.geolocation.clearWatch(this._locationWatch);
      this._watching.next(false);
      this._updating.next(false);
    }
  }
}
