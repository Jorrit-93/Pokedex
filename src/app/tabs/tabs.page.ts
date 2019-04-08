import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { FcmService } from '../services/fcm.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private fcm: FcmService, private toastCtrl: ToastController) {
    this.fcm.getToken();
    this.fcm.listenToNotifications().pipe(tap(msg => {
      const toast = this.toastCtrl.create({
        message: msg.body,
        duration: 3000
      });
      toast.present();
    })).subscribe();
  }
}
