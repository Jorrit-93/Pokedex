import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokeItem } from './poke-item';
import { GeocacheItem } from './geocache-item';
import { PokeAPIService } from './poke-api.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _pokeArray = Array<any>();
  private _pokeSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get pokemon(): Observable<any[]> { return this._pokeSubject.asObservable() }

  private _searchArray = Array<any>();
  private _searchSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get search(): Observable<any[]> { return this._searchSubject.asObservable() }

  constructor(private storage: Storage, private pokeAPI: PokeAPIService) { }

  getData(key: string): Observable<any> {
    return Observable.create(observer => {
      this.storage.get(key).then(data => {
        observer.next(data);
      });
    });
  }

  setData(key: string, value: any) {
    this.storage.set(key, value);
  }

  getAllGeocaches(): Promise<GeocacheItem[]> {
    return new Promise(resolve => {
      this.createDataIfNull('caches').then(async data => {
        var geoCacheItems = [];
        var updated = false;
        for(var i = 0; i < data.length; i++) {
          var geoCacheItem = new GeocacheItem(data[i]);
          if(geoCacheItem.checkRefresh()) {
            //geocaches get refreshed
            updated = true;
          }
          geoCacheItems.push(geoCacheItem);
        };
        if(updated) {
          this.setData('caches', geoCacheItems);
        }
        resolve(geoCacheItems);
      });
    });
  }

  setGeocache(value: GeocacheItem[]) {
    this.createDataIfNull('caches').then(data => {
      for(var i = 0; i < value.length; i++) {
        if(value[i].cacheID == undefined) {
          value[i].cacheID = data.length;
          data.push(value[i]);
        }
        else {
          data[value[i].cacheID] = value[i];
        }
      }
      this.setData('caches', data);
    });
  }

  getAllPokemon(): Promise<PokeItem[]> {
    return new Promise(resolve => {
      this.createDataIfNull('pokemon').then(async data => {
        var pokeItems = [];
        var updated = false;
        for(var i = 0; i < data.length; i++) {
          var pokeItem = new PokeItem(data[i]);
          if(pokeItem.checkRefresh()) {
            //pokemon get refreshed
            await this.pokeAPI.findPokemon(pokeItem.pokemonID).then(pokeData => {
              pokeItem.pokemon = pokeData;
            });
            updated = true;
          }
          pokeItems.push(pokeItem);
        }
        if(updated) {
          this.setData('pokemon', pokeItems);
        }

        this._pokeArray = data;
        this._pokeSubject.next(this._pokeArray);

        resolve(pokeItems);
      });
    });
  }

  setPokemon(value: any) {
    this.createDataIfNull('pokemon').then(data => {
      if(value.cacheID == null) {
        value.cacheID = data.length;
        data.push(value);
      }
      else {
        data[value.cacheID] = value;
      }
      this.setData('pokemon', data);

      this._pokeArray = data;
      this._pokeSubject.next(this._pokeArray);
    });
  }

  findPokemon(value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getData('pokemon').subscribe(data => {
        for(var i = 0; i < data.length; i++) {
          var pokeItem = new PokeItem(data[i]);
          if(pokeItem.pokemon.name == value || pokeItem.pokemon.id == value) {
            this._searchArray = [data[i]];
            this._searchSubject.next(this._searchArray);
            resolve(pokeItem);
          }
        }
        reject();
      });
    });
  }

  createDataIfNull(key: string): Promise<any> {
    return new Promise(resolve => {
      this.storage.get(key).then(data => {
        if(data == null) {
          data = new Array<PokeItem>();
        }
        resolve(data);
      });
    });
  }
}
