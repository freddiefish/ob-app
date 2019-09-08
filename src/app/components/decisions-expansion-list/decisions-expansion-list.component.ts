import { Component, OnInit, Input } from '@angular/core';
import { IDecision } from '../../models/decision-marker.model';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-decisions-expansion-list',
  templateUrl: './decisions-expansion-list.component.html',
  styleUrls: ['./decisions-expansion-list.component.scss']
})
export class DecisionsExpansionListComponent implements OnInit {

  @Input()
  decisions: IDecision[];

  constructor() { }

  ngOnInit() {
  }

}
