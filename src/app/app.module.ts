import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { LocationService } from './services/location.service';
import { DecisionLocationsService } from './services/decision-locations.service';
import { DecisionsService } from './services/decisions.service';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { StreetViewComponent } from './components/street-view/street-view.component';
import { DecisionMarkersMapComponent } from './components/decision-markers-map/decision-markers-map.component';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DecisionMarkerModalComponent } from './components/decision-marker-modal/decision-marker-modal.component';
// import { ModalComponent } from './components/modal.component';
import { ReadMoreComponent } from './components/read-more.component';
import { EllipsisModule } from 'ngx-ellipsis';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { DecisionsDialogComponent } from './decisions-dialog/decisions-dialog.component';
import { DecisionsExpansionListComponent } from './decisions-expansion-list/decisions-expansion-list.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreetViewComponent,
    DecisionMarkersMapComponent,
    DecisionMarkerModalComponent,
    ReadMoreComponent,
    DecisionsDialogComponent,
    DecisionsExpansionListComponent,
  ],
  entryComponents: [
    DecisionMarkerModalComponent,
    DecisionsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey
    }),
    AgmJsMarkerClustererModule,
    EllipsisModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    LocationService,
    DecisionLocationsService,
    DecisionsService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {height: '100vh', width: '100vw'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private locationService: LocationService, private restaurantsService: DecisionLocationsService) { }
}
