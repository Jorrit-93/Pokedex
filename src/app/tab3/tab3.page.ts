import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PokeAPIService } from '../poke-api.service';
import { StorageService } from '../storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import Leaflet from 'leaflet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private _pokeArray = Array<any>();
  private _pokeList: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get pokeList(): Observable<any[]> { return this._pokeList.asObservable() }

  map: Leaflet.Map;
  center: Leaflet.PointTuple;

  public pokeObservable: Observable<any>;
  
  constructor(private geolocation: Geolocation, private pokeAPI: PokeAPIService, private storage: StorageService) {
    this.pokeObservable = this._pokeList;


    const lat1 = 51.4254538354916;
    const lon1 = 6.14799866415185;
    const distance = 500; //494
    this.locationInRad(lat1, lon1, distance).then(data => {
      console.log(data);
    });
  }

  ionViewDidEnter(){
    console.log('test');
    this.leafletMap();
  }
  
  leafletMap(){
    this.center = [28.644800, 77.216721];
    this.map = Leaflet.map('mapId', {
      center: this.center,
      zoom: 13
    });

    var position = Leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet'
    }).addTo(this.map);

    var marker = new Leaflet.Marker(this.center);
    this.map.addLayer(marker);

    marker.bindPopup("<p>Tashi Delek.<p>Delhi</p>");
  }

  pokeClicked(id: any) {
    this.pokeAPI.findPokemon(id).then(data => {
      this.storage.setPokemon(data);
    });
  }

  addLocations(amount: number){
    this.geolocation.getCurrentPosition().then(geoData => {
      const lat1 = geoData.coords.latitude;
      const lon1 = geoData.coords.longitude;
      for(let i = 0; i < amount; i++) {
        const lat2 = lat1 + (Math.random() - 0.5) * 2 * 0.005; //0.01 lat ≈ 1 km
        const lon2 = lon1 + (Math.random() - 0.5) * 2 * 0.005; //0.01 lon ≈ 1 km
        const d = this.calcDistance(lat1, lon1, lat2, lon2);
        this.pokeAPI.findPokemon((Math.random() * 807).toFixed()).then(pokeData => { //807 pokemon in database
          const newLocation = new class {
            public lat = lat2;
            public lon = lon2;
            public distance = d.toFixed();
            public pokemon = pokeData;
          }
          this._pokeArray.push(newLocation);
          this._pokeList.next(this._pokeArray);
        });
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  locationInRad(lat1: number, lon1: number, radius: number) {
    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then(geoData => {
        const lat2 = geoData.coords.latitude;
        const lon2 = geoData.coords.longitude;
        const distance = this.calcDistance(lat1, lon1, lat2, lon2);
        resolve(distance < radius);
      });
    });
  }

  calcDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6371e3; // radius of earth in meters
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lon2 - lon1) * Math.PI / 180;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // meters

    return distance;
  }
}
