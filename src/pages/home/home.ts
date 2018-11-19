import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public authServiceProvider:AuthServiceProvider) {

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
}
