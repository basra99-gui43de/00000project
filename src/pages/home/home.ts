import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BarcodeScanner  } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
codedata={
rkey:'-LRkNCa8DDgct2EggHrf',
tnum:'14'
};
email='';
uid='';
encodedData={};

  constructor(public fire:AngularFireAuth,public storage: Storage,private barcodeScanner: BarcodeScanner,public db:AngularFireDatabase,
    public navCtrl: NavController,public authServiceProvider:AuthServiceProvider) {


  }

  ionViewDidEnter() {
}


gcode(){
  this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.codedata).then((res)=>{
  console.log(res)
  this.encodedData = res;
  }, (err) => {
    // An error occurred
    console.log(err);
  })
    }
     myFunction() {
      var x = document.getElementById("myFile");
      x.click();
  }
}
