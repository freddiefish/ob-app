import {IDecisionMarker} from './decision-marker.model';
import * as firebase from 'firebase';

export interface IDecisionMarkerSelected {
  decisionMarker: IDecisionMarker;
  geolocation: firebase.firestore.GeoPoint;
}
