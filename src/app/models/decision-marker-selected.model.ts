import {IDecisionMarker} from './decision-marker.model';
import {GeoFirePoint} from 'geofirex';

export interface IDecisionMarkerSelected {
  decisionMarker: IDecisionMarker;
  geolocation: GeoFirePoint;
}
