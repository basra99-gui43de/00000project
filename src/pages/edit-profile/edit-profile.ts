import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  myInfo = {
    name : '' ,
    age :  '' ,
    phone :  '' ,
    address :  '' ,
    city :  '' ,
    email: '',
    image: '',
    fileId: '',
    uid:''
   };
   userkey:'';
   itemList : AngularFireList<any>
   itemArray  = []
  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

    this.myInfo.name = this.navParams.get('name');
    this.myInfo.email = this.navParams.get('email');
    this.myInfo.age = this.navParams.get('phone');
    this.myInfo.phone = this.navParams.get('age');
    this.myInfo.address = this.navParams.get('address');
    this.myInfo.city = this.navParams.get('city');
    this.userkey = this.navParams.get('userkey');
console.log('myiddddddddd', this.userkey);

this.myInfo.uid = this.navParams.get('uid');
console.log('this.myInfo.uid', this.myInfo.uid);

    this.itemList = db.list('users');

  }

  onEdit( ) {
    this.itemList.update(this.userkey, {
      name : this.myInfo.name  ,
      phone :  this.myInfo.phone ,
      age : this.myInfo.age ,
      address :  this.myInfo.address ,
      city :  this.myInfo.city ,
      uid: this.myInfo.uid,
      email: this.myInfo.email
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');

   
  }

}
