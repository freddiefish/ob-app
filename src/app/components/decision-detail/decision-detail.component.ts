import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IDecision } from '../../models/decision-marker.model';
import { DecisionsService } from '../../services/decisions.service';

@Component({
  selector: 'app-decision-detail',
  templateUrl: './decision-detail.component.html',
  styleUrls: ['./decision-detail.component.scss']
})
export class DecisionDetailComponent implements OnInit {

  decision: IDecision;

  constructor(
    private route: ActivatedRoute,
    private decisionService: DecisionsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getDecision();
  }

  getDecision(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.decisionService.getDecision(id)
      .subscribe(decision => this.decision = decision[0]);
  }

  goBack(): void {
    this.location.back();
  }

}
