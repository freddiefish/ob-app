/**
 * @see https://gist.github.com/cmddavid/65abdab6d2e1330b8838e795e7d6414b
 */

import {Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {LatLngLiteral, MapsAPILoader} from '@agm/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})
export class StreetViewComponent implements OnInit {

  map: any;

  @ViewChild('streetViewMap', {static: true}) streetViewMap: any;
  @ViewChild('streetViewPano', {static: true}) streetViewPano: any;
  @Input() zoom = 11;
  @Input() heading = 34;
  @Input() pitch = 10;
  @Input() scrollwheel = false;
  @Input() enableCloseButton = false;

  /**
   * This makes sure every time a new position is passed in, the street view is updated to reflect it
   */
  private _position: LatLngLiteral = {lat: 0, lng: 0};
  @Input() set position(position: LatLngLiteral) {
    this._position = position;
    /*if (this.map) {
      this.setStreetViewPanorama();
    }*/
  }
  get position() {
    return this._position;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.setStreetViewPanorama();
  }

  setStreetViewPanorama() {
    this.map = null;
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {

        this.map = new window['google'].maps.Map(this.streetViewMap.nativeElement, {
          center: this.position,
          zoom: this.zoom,
          scrollwheel: this.scrollwheel,
        });

        const panorama = new window['google'].maps.StreetViewPanorama(this.streetViewPano.nativeElement, {
          position: this.position,
          pov: { heading: this.heading, pitch: this.pitch },
          scrollwheel: this.scrollwheel,
          enableCloseButton: this.enableCloseButton,
        });

        this.map.setStreetView(panorama);
      });
    }
  }

}
