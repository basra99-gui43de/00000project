import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { ModalController } from 'ionic-angular';
/**

 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
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
   
      this.data = navParams.get('data');
      this.key =this.data['rkey'];
      this.storage.set('rkey',  this.key);
      this.table =this.data['tnum'];
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
