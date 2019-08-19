import {IDecisionLocation} from './decision-marker.model';

export interface IDecisionMarkerSelected {
  selectedDecisionLocation: IDecisionLocation;
  allDecisionLocations: IDecisionLocation[];
}
