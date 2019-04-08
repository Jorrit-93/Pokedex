import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public observable: Observable<any>;

  constructor(private navCtrl: NavController, private storage: StorageService){
    this.observable = this.storage.pokemon;
    this.storage.getAllPokemon();
  }

  pokeClicked(id: any) {
    this.navCtrl.navigateRoot('/tabs/pokemon/' + id);
  }

  search(value: any) {
    if(value.length == 0) {
      value = '-';
    }
    this.storage.findPokemon(value).then(() => {
      this.observable = this.storage.search;
    }).catch(() => {
      this.observable = this.storage.pokemon;
    });
  }
}
