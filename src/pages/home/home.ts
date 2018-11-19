import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { BarcodeScanner  } from '@ionic-native/barcode-scanner';
import { map } from 'rxjs/operators';
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
codedata={
  drink:[
    "cola",
    "7Up"
  ],
  food:[
    "kabab",
    "shawrma"
  ]
};
itemsRef: AngularFireList<any>;
items: Observable<any[]>;
userData :AngularFireList<any>;
encodedData={};
  constructor(private barcodeScanner: BarcodeScanner,public db:AngularFireDatabase,
    public navCtrl: NavController,public authServiceProvider:AuthServiceProvider) {

      this.itemsRef = db.list('/restaurants', ref => ref.orderByChild('decs'))
      
      this.items = this.itemsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ 
          key: c.payload.key,
           name:c.payload.val().name,
           location:c.payload.val().location,
           menu:c.payload.val().menu,
         
        
           })
        );
        // console.log("ll"+this.items);
      });
 
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


gcode(){
  this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.codedata).then((res)=>{
  console.log(res)
  this.encodedData = res;
  }, (err) => {
    // An error occurred
    console.log(err);
  })
    }

}
