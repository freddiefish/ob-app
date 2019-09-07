import { Component, OnInit, Input } from '@angular/core';
import { IDecision } from '../models/decision-marker.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { DecisionsService } from '../services/decisions.service';

@Component({
  selector: 'app-decisions-expansion-list',
  templateUrl: './decisions-expansion-list.component.html',
  styleUrls: ['./decisions-expansion-list.component.scss']
})
export class DecisionsExpansionListComponent implements OnInit {

  @Input()

  decisions;

  constructor(private decisionsService: DecisionsService) { }

  ngOnInit() {
    this.getDecisions();
  }

  getDecisions = () =>
    this.decisionsService
    .getAllDecisions()
    .subscribe(res => (this.decisions = res))

}
