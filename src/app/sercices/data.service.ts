import { Injectable } from '@angular/core';

import { NgxXml2jsonService } from 'ngx-xml2json';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class DataService {
  showcamera: boolean = false;
  Data: any = null;

  downloadurl: any = null;
  constructor(
    public loadingController: LoadingController,
    public firebase: AngularFireStorage,
    private nativehttp: HTTP,
    private ngxXml2jsonService: NgxXml2jsonService,
    private qrScanner: QRScanner,
    private dialogs: Dialogs,
    private platform: Platform,
    private camera: Camera,
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.closeCamera()
    })

  }


  scandata() {
    this.showcamera = true;
    this.qrScanner.prepare().then((status: QRScannerStatus) => {

      if (status.authorized) {
        this.qrScanner.show();
        window.document.querySelector('ion-app').classList.add('cameraView');
        let scanSub = this.qrScanner.scan().subscribe((barcodeData: string) => {

          this.Data = this.proccesdata(barcodeData);
          this.showcamera = false;
          this.qrScanner.hide();
          this.qrScanner.destroy();
          scanSub.unsubscribe();
          window.document.querySelector('ion-app').classList.remove('cameraView');

          this.dialogs.alert("Successfully Scanned Data.... Now Go to next ");

        }, (err) => {
          this.dialogs.alert(JSON.stringify(err))
        });
      } else if (status.denied) {
        this.dialogs.alert("permission was denied");
      }
    }).catch((e: any) => this.dialogs.alert(e));
  }


  proccesdata(barcodeData) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(barcodeData, 'text/xml');
    const scannedcode = this.ngxXml2jsonService.xmlToJson(xml);
    const { name, gender, gname: fname, dob, yob, house, street, lm, loc, vtc, dist, state, pc } = scannedcode['PrintLetterBarcodeData']['@attributes'];

    const age = new Date().getFullYear() - yob;

    const address = {
      address: `${house} ,${street} ,${lm} ,${loc} ,${vtc}`,
      city: dist,
      state: state,
      pincode: pc,
    };

    return { name, gender, fname, dob, age, address }
  }


  async takephoto() {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    const loading = await this.loadingController.create();
    await this.camera.getPicture(options).then(async (imageData) => {
      const image = 'data:image/jpeg;base64,' + imageData;
      const fireimagepath = "Student_Photos/" + this.Data.name + '.jpg';
      await loading.present()

      const ref = this.firebase.ref(fireimagepath);
      ref.putString(image, 'data_url').snapshotChanges().pipe(
        finalize(() => {
          let url: Observable<string> = ref.getDownloadURL();
          url.subscribe((data) => {
            this.Data.imgurl = data;
            loading.dismiss();
          })
        })
      ).subscribe();
    }, (err) => {
      loading.dismiss();
      this.dialogs.alert("Error" + err);

    });

  }

  async postdata(url, data) {
    const loading = await this.loadingController.create();
    await loading.present()

    let nativecall = this.nativehttp.post(url, data, {
      'Content-Type': 'application/json'
    });

    from(nativecall).subscribe((data) => {
      const msg = JSON.parse(data.data)
      loading.dismiss();

      if (msg.Success) {
        this.dialogs.alert(msg.Success)

      } else {
        this.dialogs.alert(msg.Error)
      }

    }, (err) => {
      loading.dismiss();
      this.dialogs.alert("err" + err)
    });

  }

  closeCamera() {
    this.showcamera = false;
    this.qrScanner.hide();
    this.qrScanner.destroy();
    window.document.querySelector('ion-app').classList.remove('cameraView');
  }
}
