import {Component, EventEmitter, OnDestroy, OnInit, Output, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {Geokit, LatLngLiteral} from 'geokit';
import {Observable, from} from 'rxjs';
import {first} from 'rxjs/operators';

import {LocationService} from '../../services/location.service';
import {DecisionLocationsService} from '../../services/decision-locations.service';
import {IDecisionLocation} from '../../models/decision-marker.model';
import {IDecisionMarkerSelected} from '../../models/decision-marker-selected.model';
import {ControlPosition, ZoomControlOptions} from '@agm/core/services/google-maps-types';
import {GeoFirePoint} from 'geofirex';
import {IDecision} from '../../models/decision-marker.model';
import {InitializedGeoFireClient} from '../../services/initialized-geo-fire-client.service';
import {DecisionMarkerModalComponent} from '../decision-marker-modal/decision-marker-modal.component';
import {SearchComponent} from '../search/search.component';
import {FeedbackFormComponent} from '../feedback-form/feedback-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-decision-markers-map',
  templateUrl: './decision-markers-map.component.html',
  styleUrls: ['./decision-markers-map.component.scss']
})
export class DecisionMarkersMapComponent implements OnInit, OnDestroy {

  // TODO: Revert this
  private _lastLocation: GeoFirePoint = InitializedGeoFireClient.geoFireClient.point(0, 0);
  private _lastOpen: string;

  @Output() decisionMarkerSelected = new EventEmitter<IDecisionMarkerSelected>();
  zoomControlOptions: ZoomControlOptions = {
    position: ControlPosition.TOP_LEFT,
  };

  constructor(
    private locationService: LocationService,
    private markersService: DecisionLocationsService,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.locationService.updatingStart();
  }

  get coordsMap(): Observable<GeoFirePoint> {
    return this.locationService.mapCenter;
    /*return fromArray([InitializedGeoFireClient.geoFireClient.point(
      environment.mockedAntwerpLocation.latitude,
      environment.mockedAntwerpLocation.longitude,
    )]);*/
  }

  get coordsUser(): Observable<GeoFirePoint> {
    return this.locationService.coordinates;
    /*return fromArray([InitializedGeoFireClient.geoFireClient.point(
      environment.mockedAntwerpLocation.latitude,
      environment.mockedAntwerpLocation.longitude,
    )]);*/
  }

  get decisionLocations$(): Observable<IDecisionLocation[]> {
    return this.markersService.decisionLocations;
  }

  get updating(): Observable<boolean> {
    return this.locationService.updating;
  }

  public centerChange(coordinates: LatLngLiteral): void {
    this._lastLocation = InitializedGeoFireClient.geoFireClient.point(coordinates.lat, coordinates.lng);

    this.coordsUser
      .pipe(
        first()
      )
      .subscribe((coords: GeoFirePoint) => {
        if (Geokit.distance(this._geopoint2Literal(this._lastLocation), this._geopoint2Literal(coords)) > 0.005) {
          this.locationService.updatingStop();
        }
      });
  }

  public clickedMarker(decisionLocation: IDecisionLocation, decisionLocations: IDecisionLocation[]): void {
    this._lastOpen = decisionLocation.id;

    this.decisionMarkerSelected.emit({
      selectedDecisionLocation: decisionLocation,
      allDecisionLocations: decisionLocations,
    });

  }

  public openNonGeoDecisionList($event: IDecision) {
    this.router.navigate(['list']);
  }

  public openFeedback() {
    const dialogRef = this.dialog.open(FeedbackFormComponent,  {
      maxHeight: '100vh',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  public distance(start: GeoFirePoint, destination: GeoFirePoint): string {
    return Geokit.distance(this._geopoint2Literal(start), this._geopoint2Literal(destination), 'miles').toFixed(1);
  }

  public idle(): void {
    this.locationService.updateMapCenter(this._lastLocation);
  }

  public isOpen(id: string): boolean {
    return (this._lastOpen === id);
  }

  public toggleWatch(): void {
    this.locationService.updating
      .pipe(
        first()
      )
      .subscribe((state: boolean) => {
        (state) ? this.locationService.updatingStop() : this.locationService.updatingStart();
      });
  }

  public trackByFn(index: number, item: any): string {
    return item.$key;
  }

  private _geopoint2Literal(coordinates: GeoFirePoint): LatLngLiteral {
    return {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };
  }

}
