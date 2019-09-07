import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDecision } from '../models/decision-marker.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DecisionsService {

  constructor(
    private firestore: AngularFirestore) { }

  getAllDecisions() {
    return this.firestore.collection('decisions').snapshotChanges();
  }
}
