import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { PokeAPIService } from '../poke-api.service';
import { Gyroscope } from '@ionic-native/gyroscope/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Observable } from 'rxjs';
import * as AndroidPermissions from '@ionic-native/android-permissions';
import { PokeItem } from '../poke-item';

@Component({
  selector: 'app-poke-catch',
  templateUrl: './poke-catch.page.html',
  styleUrls: ['./poke-catch.page.scss'],
})
export class PokeCatchPage {
  public pokemonID: string;
  public pokemon: any;

  private index = 0;
  private sumG = 0;
  private pickedUp: boolean
  private catching: boolean

  private text = '';

  private permissions = AndroidPermissions.AndroidPermissions;

  constructor(private route: ActivatedRoute, private gyroscope: Gyroscope, private vibration: Vibration, private pokeAPI: PokeAPIService, private storage: StorageService) {
    // this.permissions.requestPermission(this.permissions.PERMISSION.Gyroscope).then(data => {
    //   console.log(data);
    // }).catch(err => {
    //   console.log(err);
    // });
    // this.permissions.requestPermission(this.permissions.PERMISSION.Vibration).then(data => {
    //   console.log(data);
    // });
    // this.gyroscope.getCurrent().then(data => {
    //   console.log(data);
    // });
  }

  ngOnInit() {
    this.pokemonID = window.atob(this.route.snapshot.paramMap.get('id'));
    this.pokeAPI.findPokemon(this.pokemonID).then(data => {
      var pokeItem = new PokeItem();
      pokeItem.pokemonID = data.id;
      pokeItem.pokemon = data;
      this.pokemon = pokeItem;
    });
  }
  

  ionViewWillEnter() {
    var subscription = this.gyroscope.watch({ frequency: 50 }).subscribe(gyroData => {
      var timeout: number;
      var precision: number;
      if(this.pickedUp) {
        timeout = 25;
        precision = 0.01;
      }
      else {
        timeout = 5;
        precision = 0.5;
      }
      if(this.index < timeout) {
        this.sumG = this.sumG + Math.abs(gyroData.x) + Math.abs(gyroData.y) + Math.abs(gyroData.z);
        this.index++;
      }
      else {
        if(this.sumG / this.index > precision) {
          if(!this.pickedUp) {
            if(!this.catching) {
              this.text = 'Please put your phone down...'
            }
          }
          this.pickedUp = true;
        }
        else {
          if(this.pickedUp) {
            this.text = 'Get ready...';
            const scope = this;
            setTimeout(() => {
              if(!this.pickedUp) {
                this.catching = true;
                this.text = 'Pick up!';
                scope.vibration.vibrate(1000);
                setTimeout(() => {
                  subscription.unsubscribe();
                  if(scope.pickedUp) {
                    scope.text = 'Caught :)';
                    this.storage.setPokemon(this.pokemon);
                  }
                  else{
                    scope.text = 'Fled :(';
                  }
                }, 1000);
              }
              else {
                this.catching = false;
              }
            }, Math.random() * 5000 + 1000);
          }
          this.pickedUp = false;
        }
        this.sumG = 0;
        this.index = 0;
      }
    }, err => {
      this.text = err;
    });
  }
}
