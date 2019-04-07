import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../storage.service';
import { NavController } from '@ionic/angular';
import { GeocacheItem } from '../geocache-item';
import { Map, LatLng, latLng, tileLayer, circleMarker, layerGroup } from 'leaflet';
// import Leaflet from 'leaflet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private map: Map;
  private markers: any;
  private caches: GeocacheItem[];
  private marker: any;
  private currentPos: LatLng;
  
  constructor(public navCtrl: NavController, private geolocation: Geolocation, private storage: StorageService) { }

  ngOnInit() {
    if(this.map == null) {
      this.map = new Map('map', {
        dragging: false,
        doubleClickZoom: false,
        inertia: false,
        scrollWheelZoom: false,
        touchZoom: false,
        bounceAtZoomLimits: false,
        minZoom: 18,
        maxZoom: 18
      });
      tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.map);
      this.markers = layerGroup().addTo(this.map);
      const scope = this;
      setTimeout(() => { scope.map.invalidateSize(); }, 100);
    }

    this.marker = circleMarker([0, 0], { radius: 1});
    this.marker.setStyle({ color: "#000000"});
    this.map.setView([0, 0], 18);
    this.marker.addTo(this.map);

    this.initGeolocation();
    this.initGeocaches();
  }

  initGeolocation() {
    const scope = this;
    // this.map.on('move', () => {
    this.geolocation.watchPosition().subscribe(geoData => {
      scope.currentPos = latLng([geoData.coords.latitude, geoData.coords.longitude]);
      scope.map.setView(scope.currentPos, 18);
      scope.marker.setLatLng(scope.currentPos);
      if(scope.caches != undefined) {
        scope.caches.forEach(element => {
          if(element.active && scope.locationInRad(element.lat, element.lng, 11)) {
            scope.navCtrl.navigateRoot('/tabs/catch/' + window.btoa(element.pokemonID));
            element.active = false;
            this.storage.setGeocache([element]);
          }
        });
      }
    }, err => {
      setTimeout(() => { scope.initGeolocation(); }, 1000);
    });
  }

  ionViewWillLeave() {
    this.drawGeocaches();
  }

  initGeocaches() {
    this.storage.getAllGeocaches().then(async cacheData => {
      if(cacheData.length == 0) {
        await this.createGeocaches();
      }
      else {
        this.caches = cacheData;
      }
      this.drawGeocaches();
    });
  }

  async createGeocaches() {
    var item0 = new GeocacheItem(),
        item1 = new GeocacheItem(),
        item2 = new GeocacheItem(),
        item3 = new GeocacheItem(),
        item4 = new GeocacheItem(),
        item5 = new GeocacheItem(),
        item6 = new GeocacheItem(),
        item7 = new GeocacheItem(),
        item8 = new GeocacheItem(),
        item9 = new GeocacheItem();
    item0.lat = 51.688184;
    item0.lng = 5.286145;
    item1.lat = 51.688124;
    item1.lng = 5.286842;
    item2.lat = 51.687708;
    item2.lng = 5.286643;
    item3.lat = 51.688526;
    item3.lng = 5.286579;
    item4.lat = 51.688972;
    item4.lng = 5.286600;
    item5.lat = 51.689005;
    item5.lng = 5.285828;
    item6.lat = 51.688293;
    item6.lng = 5.285378;
    item7.lat = 51.688373;
    item7.lng = 5.287995;
    item8.lat = 51.688133;
    item8.lng = 5.284306;
    item9.lat = 51.689284;
    item9.lng = 5.284541;
    var items = Array(item0, item1, item2, item3, item4, item5, item6, item7, item8, item9);
    await this.storage.setGeocache(items);
    this.caches = items;
  }

  drawGeocaches() {
    this.markers.clearLayers();
    this.caches.forEach(element => {
      const marker = circleMarker([element.lat, element.lng], { radius: 30 }).addTo(this.markers); //30 pixel ≈ 11 m
      if(!element.active) {
        marker.setStyle({ color: "#FF0000"});
      }
      else {
        marker.setStyle({ color: "#00FF00"});
      }
    });
  }

  locationInRad(lat1: number, lng1: number, radius: number) {
    const lat2 = this.currentPos.lat;
    const lng2 = this.currentPos.lng;
    const distance = this.calcDistance(lat1, lng1, lat2, lng2);
    return distance < radius;
  }

  calcDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    var R = 6371e3; // radius of earth in meters
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lng2 - lng1) * Math.PI / 180;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // meters

    return distance;
  }
}
