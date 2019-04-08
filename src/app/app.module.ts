import { NgModule } from '@angular/core';
import { App, Config, Platform, ToastController } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Gyroscope } from '@ionic-native/gyroscope/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PokeAPIService } from './services/poke-api.service';
import { StorageService } from './services/storage.service';
import { FcmService } from './services/fcm.service';

const firebase = {
  apiKey: "AIzaSyAugyUeICJkHu1IwL2HLXU4t2v4_DRWCeU",
  authDomain: "",
  databaseURL: "https://mbd1-6a5e2.firebaseio.com",
  projectId: "mbd1-6a5e2",
  storageBucket: "",
  messagingSenderId: "5200535fc0732539"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()],
  providers: [
    App,
    Config,
    Platform,
    ToastController,
    SplashScreen,
    StatusBar,
    Firebase,
    Geolocation,
    Vibration,
    Gyroscope,
    PokeAPIService,
    StorageService,
    FcmService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
