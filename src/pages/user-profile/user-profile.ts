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

  email: any;
  myid: any;
  itemList: AngularFireList<any>;

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

   ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL: Observable<string>;
  imageURL: string;

  constructor(
    private afStorage: AngularFireStorage ,
    private storage: Storage, 
    public db: AngularFireDatabase,
    public authServiceProvider:AuthServiceProvider,
    public navCtrl: NavController, public navParams: NavParams) {

  


    this.storage.get('email').then((val) =>{
      this.email = val;
      console.log('email: ', val);
      
    });

    this.storage.get('uid').then((val) =>{
      this.myid = val;
      console.log('myid: ', val);
    });

if (this.redirect === false) {''}
this.itemList = db.list('users');

    this.itemList.snapshotChanges()
    .subscribe(actions => {
          actions.forEach(action => {
            actions.map(action => ({ ['$key']: action.key, ...action.payload.val() }));

            const y = action.payload.toJSON();
            y['$key'] = action.key;
            if (action.payload.child('uid').val() === this.myid ) {
              
              this.userKey = action.key;
              console.log('action.key: ',  this.userKey);
              this.itemArray.push(y as ListItemClass);
              this.data.name = this.itemArray[0]['name'];
              this.data.phone = this.itemArray[0]['phone'];
              this.data.age = this.itemArray[0]['age'];
              this.data.address = this.itemArray[0]['address'];
              this.data.city = this.itemArray[0]['city'];
              this.data.email = this.itemArray[0]['email'];
              this.data.image = this.itemArray[0]['image'];
            }              
});
    });
  }

  moveToEdit(name, email, age,phone, address, city, userKey,fileId ){
    //this.navCtrl.setRoot(EditProfilePage);
  
    this.navCtrl.push(EditProfilePage, {
      name:name, 
      email:email, 
      age:age,
      phone:phone,
      address:address,
      city:city,
      userkey:this.userKey,
      uid:this.myid,
      fileId:this.data.fileId
    });
    
    console.log('userKey: ', this.userKey);
    console.log("fileID: ",this.data.fileId);
    

  }

  // onEdit( ) {


  //   this.itemList.set(this.userKey , {
  //     name : this.data.name  ,
  //     phone :  this.data.phone ,
  //     age : this.data.age ,
  //     address :  this.data.address ,
  //     city :  this.data.city ,
  //     email: this.email,
  //     uid: this.myid,
  //     image: this.data.image
  //   });

  // }



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









  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    console.log(this.email);
    console.log(this.myid);
  }



  moveToHome(){
this.navCtrl.setRoot(HomePage);
  }



loggedOut(){
  this.authServiceProvider.signOut().then(() => {
    this.navCtrl.setRoot(LoginPage)
  }).catch((error) =>{
alert(error)
console.log(error);
console.log('sign out is done');

  });
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
 