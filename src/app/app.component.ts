import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { TabsPage } from './tabs/tabs.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  constructor(navCtrl: NavController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, oneSignal: OneSignal) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
  
      oneSignal.startInit("2db6f23e-009d-4c38-8344-4258b0c45ad3", "293628537254");

      oneSignal.handleNotificationReceived().subscribe(noteData => {
        if(noteData.isAppInFocus) {
          console.log('in focus');
        }
        else {
          console.log('out of focus');
        }
      });

      oneSignal.handleNotificationOpened().subscribe(noteData => {
        const additionalData = noteData.notification.payload.additionalData;
        if(additionalData != undefined) {
          navCtrl.navigateRoot('/tabs/' + additionalData.tabname);
        }
      });

      oneSignal.endInit();
    });
  }
}
