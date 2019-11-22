import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { EmailValidatorDirective } from './shared/emailvalidator.directive';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DecisionsDialogComponent } from './components/decisions-dialog/decisions-dialog.component';
import { DecisionsExpansionListComponent } from './components/decisions-expansion-list/decisions-expansion-list.component';
import { SearchComponent } from './components/search/search.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackService } from './services/feedback.service';
import { NotifyDialogComponent } from './components/notify-dialog/notify-dialog.component';

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
    SearchComponent,
    FeedbackFormComponent,
    EmailValidatorDirective,
    NotifyDialogComponent
  ],
  entryComponents: [
    DecisionMarkerModalComponent,
    DecisionsDialogComponent,
    FeedbackFormComponent,
    NotifyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey
    }),
    HttpClientModule,
    AgmJsMarkerClustererModule,
    EllipsisModule,
    BrowserAnimationsModule,
    SharedModule,
    ScrollingModule
  ],
  providers: [
    LocationService,
    DecisionLocationsService,
    DecisionsService,
    FeedbackService,
    {provide: MAT_DATE_LOCALE, useValue: 'nl-BE'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private locationService: LocationService, private restaurantsService: DecisionLocationsService) { }
}
