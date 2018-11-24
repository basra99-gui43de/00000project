import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

data = {
  email:  '',
  password: ''
}
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public authServiceProvider:AuthServiceProvider) {
      this.storage.set('userIsLogin', false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){

    let credentials = {
email: this.data.email,
password: this.data.password
    }

this.authServiceProvider.signInWithEmail(credentials).then(user =>{

this.navCtrl.setRoot(HomePage);
 this.storage.set('userIsLogin', true);
}).catch(error=>{
})

// this.storage.set('userEmail', this.authServiceProvider.afAuth.auth.currentUser.email);
// this.storage.set('userUid', this.authServiceProvider.afAuth.auth.currentUser.uid);

  }




goToRegister(){
  this.navCtrl.push(RegisterPage)
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

}