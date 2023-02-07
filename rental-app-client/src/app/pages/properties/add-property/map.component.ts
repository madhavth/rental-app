import {Component, EventEmitter, Output} from '@angular/core';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  template: `
    <div
      class="map-container"
      leaflet
      [leafletOptions]="options"
      (leafletMapReady)="onMapReady($event)"
      (leafletClick)="mapClicked($event)"
    ></div>
  `,
  styleUrls: ['./app.component.css'],
})
export class MapComponent {
  @Output() markerChangeCallBack = new EventEmitter<{
    lat: number;
    lng: number;
  }>();
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 16,
    center: {lat: 41.025248138565395, lng: -91.96746201243195},
  };

  //41.025248138565395, -91.96746201243195
  myMarker = Leaflet.marker(
    {lat: 41.025248138565395, lng: -91.96746201243195},
    {draggable: true}
  ).on('click', (event) => this.markerChanged(event))
    .on('dragend', (event) => this.markerChanged(event));

  initMarkers() {
    const initialMarkers = [
      // {
      //   position: { lat: 28.625485, lng: 79.821091 },
      //   draggable: true
      // },
      // {
      //   position: { lat: 28.625293, lng: 79.817926 },
      //   draggable: false
      // },
    ];
    // for (let index = 0; index < initialMarkers.length; index++) {
    //   const data = initialMarkers[index];
    //   const marker = this.generateMarker(data, index);
    //   marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
    //   this.map.panTo(data.position);
    //   this.markers.push(marker)
    // }

    this.myMarker
      .addTo(this.map)
      .bindPopup(
        `<b>${this.myMarker.getLatLng().lat},  ${
          this.myMarker.getLatLng().lng
        }</b>`
      );
    this.map.panTo(this.myMarker.getLatLng());
    this.markers.push(this.myMarker);
  }

  markerChanged($event: any) {
    this.map.panTo($event.latlng);
    this.myMarker.setLatLng($event.latlng);
    this.markerChangeCallBack.emit({
      lat: $event.latlng.lat,
      lng: $event.latlng.lng,
    });
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, {draggable: data.draggable})
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    this.markerChanged($event);
  }

  markerClicked($event: any, index: number) {
    this.markerChanged($event);
  }

  markerDragEnd($event: any, index: number) {
    this.markerChanged($event);
  }
}
