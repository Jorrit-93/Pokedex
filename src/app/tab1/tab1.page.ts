import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public observable: Observable<any>;
  public searching: boolean = false;

  constructor(public navCtrl: NavController, public pokeAPI: PokeAPIService){
    this.observable = this.pokeAPI.pokemon;
    this.pokeAPI.getNext20Pokemon();
  }

  pokeClicked(id: any) {
    this.navCtrl.navigateRoot('/tabs/pokemon/' + id);
  }

  search(value: any) {
    if(value.length == 0) {
      value = '-';
      this.searching = false;
    }
    else {
      this.searching = true;
    }
    this.pokeAPI.findPokemon(value).then(() => {
      this.observable = this.pokeAPI.search;
    }).catch(() => {
      this.observable = this.pokeAPI.pokemon;
    });
  }
}
