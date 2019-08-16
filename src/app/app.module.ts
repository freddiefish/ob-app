import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { LocationService } from './services/location.service';
import { DecisionMarkersService } from './services/decision-markers.service';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import { StreetViewComponent } from './components/street-view/street-view.component';
import { DecisionMarkersMapComponent } from './components/decision-markers-map/decision-markers-map.component';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from '../environments/environment';
import { DecisionMarkerModalComponent } from './components/decision-marker-modal/decision-marker-modal.component';
import {ModalComponent} from './components/modal.component';
import {ReadMoreComponent} from './components/read-more.component';



firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreetViewComponent,
    DecisionMarkersMapComponent,
    DecisionMarkerModalComponent,
    ModalComponent,
    ReadMoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey
    }),
    AgmJsMarkerClustererModule,
  ],
  providers: [
    LocationService,
    DecisionMarkersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private locationService: LocationService, private restaurantsService: DecisionMarkersService) { }
}
