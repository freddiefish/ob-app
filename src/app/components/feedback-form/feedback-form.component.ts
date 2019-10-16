import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback';
import { MatSliderChange, MatSelectChange, MatDialogRef } from '@angular/material';
import { FeedbackService } from '../../services/feedback.service';

import { from } from 'rxjs';

export interface Background {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})

export class FeedbackFormComponent implements OnInit {

  backgrounds: Background[] = [
    {value: '0', viewValue: 'kies...'},
    {value: '1', viewValue: 'ambtenaar'},
    {value: '2', viewValue: 'burger'},
    {value: '3', viewValue: 'journalist'},
    {value: '4', viewValue: 'andere'}
    ];

  model = new Feedback('');

  submitted = false;
  commonBackground = true;
  sliderUsed = false;
  feedbacks = [];

  constructor(private feedbackService: FeedbackService,
              public dialogRef: MatDialogRef<any>) { }

  closeDialog() {
    this.dialogRef.close('Feedback dialog closed!');
  }

  onSubmit() {
    this.submitted = true;
    const newFeedback: Feedback = this.model;
    if (!this.sliderUsed) {
      this.model.rating = null;
    }
    if (this.model.background) {
      const key = this.model.background;
      this.model.background = this.backgrounds[key]['viewValue'];
    }

    this.sendFeedback(newFeedback);
    // update UI
    // htis;router.navigate('home');
  }

  sendFeedback(newFeedback) {
    this.feedbackService
      .sendFeedback(newFeedback)
      .subscribe(
        (data: Feedback) => {
          console.log(data);
        });
  }

  onInputChange(event: MatSliderChange) {
    this.sliderUsed = true;
    console.log(event.value);
  }

  onSelectionChanged(event: MatSelectChange) {
    this.commonBackground = true;
    if (event.value == 4) {
      this.commonBackground = false;
    }
  }

  // TODO: remove this when done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
