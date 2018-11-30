import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {location} from '../../model/location';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the AddMapPosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-map-pos',
  templateUrl: 'add-map-pos.html',
})
export class AddMapPosPage {
  locations:location={
    info:'',
    latitude : '' ,
    longitude :'' 
  
  }
  private gpsListRef = this.db.list<location>('addPosMap')

    constructor(public navCtrl: NavController ,
      public db:AngularFireDatabase
                ) {
  
    }
    addLocation(locations:location){
      alert (location)
      return this.gpsListRef.push(locations)



}
}
