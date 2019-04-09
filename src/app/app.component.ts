import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { TabsPage } from './tabs/tabs.page';
import { PokeAPIService } from './services/poke-api.service';
import { StorageService } from './services/storage.service';
import { PokeItem } from './storage_items/poke-item';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  private inFocus: boolean

  constructor(navCtrl: NavController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, oneSignal: OneSignal, private pokeAPI: PokeAPIService, private storage: StorageService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
  
      oneSignal.startInit("2db6f23e-009d-4c38-8344-4258b0c45ad3", "293628537254");

      oneSignal.handleNotificationReceived().subscribe(noteData => {
        if(noteData.isAppInFocus) {
          console.log('in focus');
          this.inFocus = true;
        }
        else {
          console.log('out of focus');
          this.inFocus = false;
        }
      });

      oneSignal.handleNotificationOpened().subscribe(noteData => {
        var pokemonID = (Math.random() * 807).toFixed();
        const additionalData = noteData.notification.payload.additionalData;
      
        if(additionalData != undefined) {
          if(additionalData.tabName != undefined) {
            navCtrl.navigateRoot('/tabs/' + additionalData.tabName);
          }
          if(additionalData.pokemonID != undefined) {
            pokemonID = additionalData.pokemonID;
          }
        }
        if(this.inFocus) {
          this.pokeAPI.findPokemon(pokemonID).then(data => { //807 pokemon in database
            var pokeItem = new PokeItem();
            pokeItem.pokemonID = data.id;
            pokeItem.pokemon = data;
            this.storage.setPokemon(pokeItem);
          });
        }
      });

      oneSignal.endInit();
    });
  }
}
