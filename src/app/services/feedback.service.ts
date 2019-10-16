import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Feedback } from '../models/feedback';
import { environment } from '../../environments/environment';

export interface APIresponse {
    result: string;
  }

const APIUrl = environment.api;

@Injectable()
export class FeedbackService {

    constructor(private http: HttpClient) {}

    /** POST: post a new feedback to the API */
    sendFeedback(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(APIUrl, feedback)
            .pipe(
                retry(1), // retry a failed request up to 1 times
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}, ` +
            `text was: ${error.error.text}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }

}
