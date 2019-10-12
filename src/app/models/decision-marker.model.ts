import {firestore} from 'geofirex';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface IDecision {
  id: string;
  addenda?: any;
  assocDocs?: any;
  date: string;
  decision?: any;
  docId: string;
  financialConseq?: boolean;
  financialStakeholders?: any;
  groupId: string;
  groupName: string;
  hasGeoData: boolean;
  intId: string;
  offTitle: string;
  published: boolean;
  sortIndex1: string;
  status: string;
  textParts?: any;
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
    addenda: data.addenda,
    assocDocs: data.assocDocs,
    date: data.date,
    decision: data.decision,
    docId: data.docId,
    financialConseq: data.financialConseq,
    financialStakeholders: data.financialStakeholders,
    groupId: data.groupId,
    groupName: data.groupName,
    hasGeoData: data.hasGeoData,
    intId: data.intId,
    offTitle: data.offTitle,
    published: data.published,
    sortIndex1: data.sortIndex1,
    status: data.status,
    textParts: data.textParts,
    title: data.title
  };
};
