import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from "../../sercices/data.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})

export class TeacherPage implements OnInit {

  course = [];
  hide = true;
  satuts = [false, false, false, false];
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  readonly Url = 'https://cooing-famous-iguanacolossus.glitch.me/Auth/Faculty';
  Data: { [k: string]: any } = {};
  imageurl = '';
  downloadurl: any;

  form: FormGroup = new FormGroup({
    email: new FormControl("", Validators.email),
    Password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8)
    ]),
    PhNo: new FormControl("", [
      Validators.required,
      Validators.pattern(/^\+?\d{10}$/)
    ]),
    Course_id: new FormControl()
  });

  constructor(public Data_Service: DataService,
    private platform: Platform,
    private http: HTTP,
    private router: Router
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.Data_Service.closeCamera()
      } else {
        this.Data_Service.closeCamera()
      }
    })
  }


  ngOnInit() {

    this.http
      .get(
        "https://cooing-famous-iguanacolossus.glitch.me/Admin/course", {}, { "Content-Type": "application/json" }
      )
      .then(data => {

        this.course = JSON.parse(data.data).filter(ele => { if (ele.Is_Active) return ele })
        const toSelect = this.course.find(c => c._id);
        this.form.get('Course_id').setValue(toSelect._id);
      })
      .catch(e => console.log(e));

  }

  onSubmit() {

    if (this.form.valid) {
      this.Data.email = this.form.value.email;
      this.Data.Password = this.form.value.Password;
      this.Data.PhNo = this.form.value.PhNo;
      this.Data.Course_id = this.form.value.Course_id;
      this.Data.Standard_id = this.form.value.Standard_id;
    }
  }

  scandata() {
    this.Data_Service.scandata();
    this.satuts[1] = this.satuts[0] = true;
  }

  proccesdata(barcodeData) {
    this.Data_Service.proccesdata(barcodeData);
  }

  async takephoto() {
    this.satuts[2] = true;
    await this.Data_Service.takephoto();
    this.Data = await this.Data_Service.Data;
    this.downloadurl = await this.Data.imgurl;
  }

  postdata() {
    this.Data_Service.postdata(this.Url, this.Data);
  }

}
