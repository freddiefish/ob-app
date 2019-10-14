import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback';

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
    {value: 'kies...', viewValue: 'kies...'},
    {value: 'ambtenaar', viewValue: 'ambtenaar'},
    {value: 'burger', viewValue: 'burger'},
    {value: 'journalist', viewValue: 'journalist'},
    {value: 'andere', viewValue: 'andere'}
    ];

  model = new Feedback(1, 0, '', '');

  submitted = false;
  otherBackground = true;

  constructor() { }

  onSubmit() {
    this.submitted = true;
    // email it
  }



  // TODO: remove this when done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
