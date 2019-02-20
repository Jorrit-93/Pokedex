import { Component } from '@angular/core';
import { PokeAPIService } from '../poke-api.service';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public navCtrl: NavController;
  public pokeService: PokeAPIService;
  public pokemonObservable: Observable<any>;
  public updatePokemon: any;
  public currentList: Observable<any>;
  public dataResults = Array<any>();
  public pokemonList = Array<Array<any>>();

  constructor(navCtrl: NavController, pokeService: PokeAPIService){
    this.navCtrl = navCtrl;
    this.pokeService = pokeService;
    this.currentList = pokeService.getData('https://pokeapi.co/api/v2/pokemon');
    this.initPokemonList();
    this.getPokemon();
  }

  pokemonClicked(id: any) {
    this.navCtrl.navigateRoot('/tabs/pokemon/' + id);
  }

  initPokemonList() {
    this.pokemonObservable = Observable.create(observer => {
      this.updatePokemon = function () {
        observer.next(this.pokemonList);
      };
    });
  }

  getPokemon() {
    this.currentList.subscribe(data => {
      let dataAsAny = data as any;
      this.updatePokemonList(dataAsAny.results);
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
}
