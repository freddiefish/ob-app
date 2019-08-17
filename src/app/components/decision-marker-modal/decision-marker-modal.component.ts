import {Component, Input, OnInit} from '@angular/core';
import {IDecisionMarker} from '../../models/decision-marker.model';
import {ModalService} from '../../services/modal.service';
import {GeoFirePoint} from 'geofirex';

@Component({
  selector: 'app-decision-marker-modal',
  templateUrl: './decision-marker-modal.component.html',
  styleUrls: ['./decision-marker-modal.component.scss']
})
export class DecisionMarkerModalComponent implements OnInit {

  modalId = 'decision-marker-modal';
  @Input() decisionMarker: IDecisionMarker;
  @Input() geolocation: GeoFirePoint;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  closeModal(modalId: string) {
    this.modalService.close(modalId);
  }
}
