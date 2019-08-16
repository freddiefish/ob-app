import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {DecisionMarkerModalComponent} from '../decision-marker-modal/decision-marker-modal.component';
import {IDecisionMarkerSelected} from '../../models/decision-marker-selected.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(DecisionMarkerModalComponent, {static: true}) decisionMarkerModal: DecisionMarkerModalComponent;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openStreetView($event: IDecisionMarkerSelected) {
    this.decisionMarkerModal.decisionMarker = $event.decisionMarker;
    this.decisionMarkerModal.geolocation = $event.geolocation;

    this.modalService.open(this.decisionMarkerModal.modalId);
  }
}
