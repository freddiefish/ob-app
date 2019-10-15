import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Feedback } from '../models/feedback';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

export interface Email {
    emailAPIUrl: string;
    APIKey: string;
    response: string;
  }

const httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class FeedbackService {

  emailAPIUrl = 'https://ob-app-dev-252415.appspot.com/api/email';
    private handleError: HandleError;

    constructor(private http: HttpClient) {}

    /** POST: post a new feedback to the API */
    sendFeedback(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(this.emailAPIUrl, feedback, httpOptions)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError('sendFeedback', feedback))
            );
    }

}
