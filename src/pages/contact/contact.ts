import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
cr=[];
totalePrice=0;
  constructor(public storage: Storage,public navCtrl: NavController) {

  }
  ionViewDidEnter() {
    this.storage.get('cartData').then((val) => {
      this.cr=val;
      console.log('Your cartData is', val);
    });
    
    this.storage.get('totalePrice').then((totalePrice) => {
      this.totalePrice=totalePrice;
      console.log('Your price is', totalePrice);
    });

  }

}
