import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDecision } from '../models/decision-marker.model';
import { map } from 'rxjs/operators';
import * as firebaseApp from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DecisionsService {

  /* constructor(
    private firestore: firebaseApp,
    private http:HttpClient) { }

  findAllCourses(): Observable<IDecision[]> {
    return this.http.get
  } */
}
