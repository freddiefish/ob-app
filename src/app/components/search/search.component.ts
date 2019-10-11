import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string ;
  startAt: any;
  endAt: any;
  results: any;

  constructor(public db: AngularFirestore) { }

  search($event) {
    const param = $event.target.value;
    this.startAt.next(param);
    this.endAt.next(param + '\uf8ff');
    this.results = this.db.collection('decisions', ref => ref
      .orderBy('date')
      .startAt(param)
      .endAt(param + '\uf8ff')
      .limit(10))
      .valueChanges();
  }

  ngOnInit() {
  }

}
