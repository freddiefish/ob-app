import {firestore} from 'geofirex';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface IDecision {
  id: string;
  background: string;
  date: string;
  decision: string;
  docId: string;
  fullText: string;
  groupId: string;
  groupName: string;
  hasGeoData: boolean;
  published: boolean;
  title: string;
}

export interface IDecisionLocation {
  id: string;
  decisionRef: firestore.DocumentReference;
  formattedAddress: string;
  point: {
    geopoint: firestore.GeoPoint;
    geohash: string;
  };
}

export const createDecision = (data: Partial<IDecision>): IDecision => {
  return {
    id: data.id,
    background: data.background,
    date: (data.date as any).toDate(),
    decision: data.decision,
    docId: data.docId,
    fullText: data.fullText,
    groupId: data.groupId,
    groupName: data.groupName,
    hasGeoData: data.hasGeoData,
    published: data.published,
    title: data.title
  };
};
