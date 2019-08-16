import * as firebase from 'firebase';

export interface IDecisionMarker {
  $key: string;
  background: string;
  title: string;
  url: string;
  date: any;
  decision: string;
  geolocations: Array<firebase.firestore.GeoPoint>;
}
