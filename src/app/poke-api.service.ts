import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class PokeAPIService {
  public http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getData(url: string) {
    return this.http.get(url);
  }
}
