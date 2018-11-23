import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
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
  data={ };
  key:any;
  table:any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  restaurantsRef: AngularFireList<any>;
  restaurants: Observable<any[]>;
  cartData=[];
  cartCont=0;
  totalePrice=0;
  constructor(public modalCtrl: ModalController,public storage: Storage,public navCtrl: NavController, 
    public navParams: NavParams,public db:AngularFireDatabase) {
   
    this.key ='-LRkNCa8DDgct2EggHrf'
    this.table ='12';
    this.storage.set('rkey',  this.key);
    this.storage.set('tableNumber', this.table);

    this.itemsRef = db.list('/menu', ref => ref.orderByChild('decs')) 
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ 
        key: c.payload.key,
         name:c.payload.val().name,
         price:c.payload.val().price,
         type:c.payload.val().type,
         restaurant_key:c.payload.val().restaurant_key,
         })
      );
    });

    this.restaurantsRef = db.list('/restaurants', ref => ref.orderByKey().equalTo(this.key))
    this. restaurants = this.restaurantsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ 
        key: c.payload.key,
         name:c.payload.val().name,
        
         })
      );
    });


  }//constracter

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
    this.storage.get('cartData').then((val) => {
      if (val == null) {
        this.cartData =[];
        this.cartCont ==0
      }else{
        this.cartData=val;
        this.cartCont = this.cartData.length;
      }
      
    });
    this.storage.get('totalePrice').then((totalePrice) => {
      this.totalePrice=totalePrice;
    });

  }
  addToCart(n,p){
    
   this.cartData.push({
     name:n,
     price:p
   });
    this.totalePrice = this.totalePrice + parseInt(p);
    console.log('this.totalePrice'+this.totalePrice);
    this.cartCont = this.cartData.length;
   this.storage.set('cartData', this.cartData);
   this.storage.set('totalePrice', this.totalePrice);
  }
  presentPopover() {
    const modal = this.modalCtrl.create(CartPage);
    modal.present();
  }
  
}
