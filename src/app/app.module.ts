import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxXml2jsonService } from 'ngx-xml2json';
import { ReactiveFormsModule } from "@angular/forms";
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';


export const firebaseConfig = {
  apiKey: "AIzaSyCZ9M0RN_QYnNq2LtkgJVxcyoPfbZP0wUQ",
  authDomain: "students-425c5.firebaseapp.com",
  databaseURL: "https://students-425c5.firebaseio.com",
  projectId: "students-425c5",
  storageBucket: "students-425c5.appspot.com",
  messagingSenderId: "807033073967",
  appId: "1:807033073967:web:8eb37eb994406932b1f1da"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
        BrowserModule,
        IonicModule.forRoot(), 
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireStorageModule,
        BrowserAnimationsModule, 
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NgxXml2jsonService,
    ReactiveFormsModule,
    Dialogs,
    QRScanner,
    Camera,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
