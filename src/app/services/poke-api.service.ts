import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  private _pokeArray = Array<any>();
  private _pokeSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get pokemon(): Observable<any[]> { return this._pokeSubject.asObservable() }

  private _searchArray = Array<any>();
  private _searchSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get search(): Observable<any[]> { return this._searchSubject.asObservable() }

  private next20Url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

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
        this._pokeSubject.next(this._pokeArray);
        if(event != null) {
          event.target.complete();
        }
      });
    });
  }

  findPokemon(value: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://pokeapi.co/api/v2/pokemon/' + value).toPromise().then(data => {
        this._searchArray = [data];
        this._searchSubject.next(this._searchArray);
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    })
  }
}
