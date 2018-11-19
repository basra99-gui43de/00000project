import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  data={ };
  keys:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('data');
    //  this.keys = Object.keys(this.data['food']);
     //alert(this.keys);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
