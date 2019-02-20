import { Component } from '@angular/core';
import { PokeAPIService } from '../poke-api.service';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public pokeService: PokeAPIService;
  public pokemon: Observable<any>;
  public updatePokemon: any;
  public currentList: Observable<any>;
  public dataResults = Array<any>();
  public pokemonList = Array<Array<any>>();

  constructor(pokeService: PokeAPIService){
    this.pokeService = pokeService;
    this.currentList = this.pokeService.getData('https://pokeapi.co/api/v2/pokemon');
    this.initPokemonList();
    this.getPokemon();
  }

  getPokemon() {
    this.currentList.subscribe(data => {
      let dataAsAny = data as any;
      this.updatePokemonList(dataAsAny.results);
    });
  }

  getNext20Pokemon(event) {
    this.currentList.subscribe(data => {
      let dataAsAny = data as any;
      if(dataAsAny.next != undefined) {
        this.currentList = this.pokeService.getData(dataAsAny.next);
        this.getPokemon();
      }
      event.target.complete();
    });
  }

  initPokemonList() {
    this.pokemon = Observable.create(observer => {
      this.updatePokemon = function () {
        observer.next(this.pokemonList);
      };
    });
  }

  updatePokemonList(dataResults: any) {
    let reqArray = Array<any>();
    dataResults.forEach(element => {
      reqArray.push(this.pokeService.getData(element.url));
    });
    forkJoin(reqArray).subscribe(data => {
      this.pokemonList = this.pokemonList.concat(data);
      this.updatePokemon();
    });
  }

  // getResults() {
  //   let reqArray = Array<any>();
  //   this.dataResults.forEach(element => {
  //     reqArray.push(this.pokeService.getData(element.url));
  //   });
  //   return reqArray;
  // }
}
