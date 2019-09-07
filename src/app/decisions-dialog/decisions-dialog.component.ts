import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-decisions-dialog',
  templateUrl: './decisions-dialog.component.html',
  styleUrls: ['./decisions-dialog.component.scss']
})
export class DecisionsDialogComponent implements OnInit {
  decisions: [];
  constructor(
    public dialogRef: MatDialogRef<DecisionsDialogComponent>
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
