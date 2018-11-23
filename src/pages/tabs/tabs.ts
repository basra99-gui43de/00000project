import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { UserProfilePage } from '../user-profile/user-profile';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { CartPage } from '../cart/cart';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = UserProfilePage;
  tab4Root = CartPage;

  data={ };
  encodemyData:string;
encodedData:{};

  option:BarcodeScannerOptions ;
  constructor(private barcodeScanner: BarcodeScanner,public navCtrl: NavController) { 
    
  }

  scan(){
   
    this.option = {

      prompt: "Please scan your code"
    }
    this.barcodeScanner.scan(this.option).then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData);
      this.data = JSON.parse(barcodeData.text) 
      this.navCtrl.push(MenuPage,{
        data:this.data
      });

     }, (err) => {
         // An error occurred
         console.log(err);
     });

  }
}
