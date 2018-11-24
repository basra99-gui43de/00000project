import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  itemList: AngularFireList<any>;
  private user : firebase.User
data = {
  email:  '',
  password: ''
}
userId:any;
userEmail:any;


  constructor(public db:AngularFireDatabase ,public fire:AngularFireAuth,
    private toastCtrl: ToastController,public navCtrl: NavController, 
    public navParams: NavParams,
    public authServiceProvider:AuthServiceProvider) {

      this.itemList = db.list('users');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register(){
    let email_already_in_use = this.toastCtrl.create({
      message: 'هذا المستخدم موجود مسبقاً ..!',
      duration: 3000,
      position: 'top'
      
    });
    let weak_password = this.toastCtrl.create({
      message: 'كلمة المرور ضعيفة ..!',
      duration: 3000,
      position: 'top'
    });
    let invalid_email = this.toastCtrl.create({
      message: 'تأكد من البريد الالكتروني بشكل صحيح ..!',
      duration: 3000,
      position: 'top'
    });
    this.fire.auth.createUserWithEmailAndPassword(this.data.email,this.data.password).then(user=>{
      this.navCtrl.setRoot(HomePage);
      this.userId=this.fire.auth.currentUser.uid;
      this.userEmail=this.fire.auth.currentUser.email;
      this.creatUser();
    }).catch(function(error){
      console.log(error);
      console.log(error.code);
      if (error.code=="auth/email-already-in-use") {
        email_already_in_use.present();
      }
      if (error.code=="auth/weak-password") {
        weak_password.present();
      }
      if (error.code=="auth/invalid-email") {
        invalid_email.present();
      }

    })
    console.log(this.data.email +" "+this.data.password);
  }

 creatUser(){
  this.itemList.push({
    uid : this.userId,
    email : this.userEmail,
    name : ''  ,
    phone :  '' ,
    age : '' ,
    address :  '' ,
    city :  '' ,
    image: '../../assets/imgs/person.png'
  });
 }

}