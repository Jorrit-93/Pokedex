import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _pokeArray = Array<any>();
  private _pokeList: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get pokeList(): Observable<any[]> { return this._pokeList.asObservable() }

  private _searchArray = Array<any>();
  private _searchList: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get searchList(): Observable<any[]> { return this._searchList.asObservable() }

  constructor(private storage: Storage) { }

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

  getPokemon(): Promise<any> {
    return new Promise(resolve => {
      this.createDataIfNull('pokemon').then(data => {
        this._pokeArray = data;
        this._pokeList.next(this._pokeArray);
        resolve(this._pokeArray);
      });
    });
  }

  findPokemon(value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getData('pokemon').subscribe(data => {
        const dataAsAny = data as any;
        dataAsAny.forEach(element => {
          const elementAsAny = element as any;
          if(elementAsAny.name == value || elementAsAny.id == value) {
            this._searchArray = [element];
            this._searchList.next(this._searchArray);
            resolve(element);
          }
        });
        reject();
      });
    });
  }

  setPokemon(value: Array<any>) {
    this.createDataIfNull('pokemon').then(data => {
      const dataAsAny = data as any;
      dataAsAny.push(value);
      this.setData('pokemon', dataAsAny);
      this._pokeArray = dataAsAny;
      this._pokeList.next(this._pokeArray);
    });
  }

  createDataIfNull(key: string): Promise<any> {
    return new Promise(resolve => {
      this.storage.get(key).then(data => {
        if(data == null) {
          data = [];
          this.setData(key, data);
        }
        resolve(data);
      });
    });
  }
}
