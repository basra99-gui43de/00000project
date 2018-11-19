import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data={ };
  encodemyData:string;
encodedData:{};

  option:BarcodeScannerOptions ;
  constructor(private barcodeScanner: BarcodeScanner,public navCtrl: NavController,public authServiceProvider:AuthServiceProvider) {

  }

  goToRegister(){
    this.navCtrl.push(RegisterPage)
  }
  goToLogin(){
    this.navCtrl.push(LoginPage)
  }

   registerWithGoogle(){

      this.authServiceProvider.signInWithGoogle().then(
        ()=> this.navCtrl.setRoot(TabsPage),
        error => console.log('error')
      )

  }

  registerWithFacebook(){

    this.authServiceProvider.signInWithFacebook().then(
      ()=> this.navCtrl.setRoot(TabsPage),
      error => console.log('error')
    )

}


scan(){
   
  this.option = {

    prompt: "Please scan your code"
  }
  this.barcodeScanner.scan(this.option).then((barcodeData) => {
    // Success! Barcode data is here
    console.log(barcodeData);
    this.data = barcodeData;


   }, (err) => {
       // An error occurred
       console.log(err);
   });

}
}
