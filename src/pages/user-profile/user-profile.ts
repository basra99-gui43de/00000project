import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public isUpload: Boolean = false;

  email='';
  myid='';
  itemList: AngularFireList<any>;
  items: Observable<any[]>;

itemArray = [];

  data = {
    name : '' ,
    age :  '' ,
    phone :  '' ,
    address :  '' ,
    city :  '' ,
    email: '',
    image: '',
    fileId: ''
   };
 redirect: boolean = false;
   userKey: any;
   x:any;

   ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL: Observable<string>;
  imageURL: string;

  constructor(
    private afStorage: AngularFireStorage ,
    private storage: Storage, 
    public db: AngularFireDatabase,
    public authServiceProvider:AuthServiceProvider,
    public navCtrl: NavController,public fire:AngularFireAuth, public navParams: NavParams) {
    this.authServiceProvider.getUid().subscribe(uid=>{
      this.myid= uid;
      console.log(uid)
    })
  }

  moveToEdit(name, email, phone,age, address, city, userKey,myid,fileId ){  
    this.navCtrl.push(EditProfilePage, {
      name:name, 
      email:email, 
      age:age,
      phone:phone,
      address:address,
      city:city,
      userkey:userKey,
      uid:myid,
      fileId:fileId
    });
    
    console.log('userKey: ', this.userKey);
    console.log("fileID: ",this.data.fileId);
    

  }



  updateUpload(event ) {
    
    this.isUpload = true;
    this.storage.set('isUpload', 'true');

    this.itemArray = [];
    console.log('start upload');
    const id = Math.random().toString(36).substring(2);
    this.afStorage.upload(id, event.target.files[0]).then(() => {
    const task = this.ref = this.afStorage.ref(id);
    const downloadURL = this.ref.getDownloadURL().subscribe(url => {
    console.log('new file ID  : ' + id);
    console.log('Old file ID  : ' + this.data.fileId);
    if (this.data.fileId !== '') {
    firebase.storage().ref(this.data.fileId).delete().then(() => {
      console.log('deleted file : ' + this.data.fileId);
    });
    }
    this.itemList.update(this.userKey , {
      name : this.data.name  ,
      phone :  this.data.phone ,
      age : this.data.age ,
      address :  this.data.address ,
      city :  this.data.city ,
      email: this.email,
      image : this.imageURL = url,
      fileId : this.data.fileId = id,
      uid : this.myid
    });
    console.log('updated image');
    });
    });

    }

    login(){
      this.navCtrl.push(LoginPage);
    }

  ionViewDidEnter() {
       this.getUserData();
  }



  moveToHome(){
this.navCtrl.setRoot(HomePage);
  }



loggedOut(){
  this.authServiceProvider.signOut().then(() => {
    this.navCtrl.setRoot(LoginPage);
    console.log('sign out is done');
  }).catch((error) =>{
alert(error)
console.log(error);


  });
}

getUserData(){
 
  this.itemList = this.db.list('/users', ref => ref.orderByChild('uid').equalTo(this.myid))
  this. items = this.itemList.snapshotChanges().map(changes => {
    return changes.map(c => ({ 
      key: c.payload.key,
       name:c.payload.val().name,
       email:c.payload.val().email,
       image:c.payload.val().image,
       phone:c.payload.val().phone,
       age:c.payload.val().age,
       address:c.payload.val().address,
       city:c.payload.val().city,
      
       })
    );
  });

// if (this.redirect === false) {''}
}


}

export class ListItemClass {
  $key: string;
  name: string;
  age:  string;
  phone:  string;
  address:  string;
  city: string;
  email: string;
}
 