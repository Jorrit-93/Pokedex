import { NgModule } from '@angular/core';
import { App, Config} from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Platform, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Gyroscope } from '@ionic-native/gyroscope/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PokeAPIService } from './services/poke-api.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()],
  providers: [
    App,
    Config,
    Platform,
    StatusBar,
    SplashScreen,
    OneSignal,
    Geolocation,
    Vibration,
    Gyroscope,
    PokeAPIService,
    StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
