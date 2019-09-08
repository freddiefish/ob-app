import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { IDecision } from '../../models/decision-marker.model';
import { DecisionsService } from '../../services/decisions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-decisions-dialog',
  templateUrl: './decisions-dialog.component.html',
  styleUrls: ['./decisions-dialog.component.scss']
})
export class DecisionsDialogComponent implements OnInit {

  @Input()

  decisions$: Observable<IDecision[]>;

  constructor(
    public dialogRef: MatDialogRef<DecisionsDialogComponent>,
    private decisionsService: DecisionsService
  ) { }

  ngOnInit() {
    this.decisions$ = this.decisionsService.getAllDecisions();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
