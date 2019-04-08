import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor( public firebaseNative: Firebase, public afs: AngularFirestore, private platform: Platform) {

  }

  async getToken() {
    let token: string;
    if(this.platform.is('android')) {
      console.log('test');
      console.log(this.firebaseNative);
      console.log(await this.firebaseNative.getToken());
      token = await this.firebaseNative.getToken();
    }
    if(this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    return this.saveTokenToFirestore(token);
  }

  private saveTokenToFirestore(token: string) {
    if(!token) {
      return;
    }
    const devicesRef = this.afs.collection('devices');
    const docData = { token, userId: 'testUser' };
    return devicesRef.doc(token).set(docData);
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
  
}
