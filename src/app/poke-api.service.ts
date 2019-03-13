import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  private _pokeArray = Array<any>();
  private _pokeList: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get pokeList(): Observable<any[]> { return this._pokeList.asObservable() }

  private _searchArray = Array<any>();
  private _searchList: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get searchList(): Observable<any[]> { return this._searchList.asObservable() }

  private next20Url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(public http: HttpClient) { }

  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  getNext20Pokemon(event?: any) {
    this.getData(this.next20Url).subscribe(data => {
      const dataAsAny = data as any;
      this.next20Url = dataAsAny.next;
      const reqArray = Array<any>();
      dataAsAny.results.forEach(element => {
        reqArray.push(this.getData(element.url));
      });
      forkJoin(reqArray).subscribe(data => {
        this._pokeArray = this._pokeArray.concat(data);
        this._pokeList.next(this._pokeArray);
        if(event != null) {
          event.target.complete();
        }
      });
    });
  }

  findPokemon(value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://pokeapi.co/api/v2/pokemon/' + value).toPromise().then(data => {
        this._searchArray = [data];
        this._searchList.next(this._searchArray);
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
