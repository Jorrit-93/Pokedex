import { Component } from '@angular/core';
import { PokeAPIService } from '../poke-api.service';
import { Observable, forkJoin } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public pokeObservable: Observable<any>;

  constructor(public navCtrl: NavController, public pokeAPI: PokeAPIService){
    this.pokeObservable = this.pokeAPI.pokeList;
    this.pokeAPI.getNext20Pokemon();
  }

  pokeClicked(id: any) {
    this.navCtrl.navigateRoot('/tabs/pokemon/' + id);
  }

  search(value: any) {
    if(value.length == 0) {
      value = '-';
    }
    this.pokeAPI.findPokemon(value).then(() => {
      this.pokeObservable = this.pokeAPI.searchList;
    }).catch(() => {
      this.pokeObservable = this.pokeAPI.pokeList;
    });
  }
}
