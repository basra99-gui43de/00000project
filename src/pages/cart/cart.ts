import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the CartPage page.
 
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cr=[];
  totalePrice=0;
  tableNumber:any;
  rKey:any;
  myid='';
  itemList: AngularFireList<any>;
  itemOrder: AngularFireList<any>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
    constructor(public db:AngularFireDatabase ,public authServiceProvider:AuthServiceProvider,public viewCtrl: ViewController,public storage: Storage,public navCtrl: NavController) {
      this.itemList = db.list('tableOrder')
      this.itemOrder = db.list('userOrder')
      this.authServiceProvider.getUid().subscribe(uid=>{
        this.myid= uid;
        console.log(uid)
      })
    }
    ionViewDidEnter() {
      this.storage.get('cartData').then((val) => {
        this.cr=val;
        console.log('Your cartData is', val);
      });
      
      this.storage.get('totalePrice').then((totalePrice) => {
        this.totalePrice=totalePrice;
        console.log('Your price is', totalePrice);
      });

      this.storage.get('rkey').then((rkey) => {
        this.rKey=rkey;
        console.log('Your rkey is', rkey);
      });
      this.storage.get('tableNumber').then((tableNumber) => {
        this.tableNumber=tableNumber;
        console.log('Your tableNumber is', tableNumber);
      });
  
  
    }
    dismiss() {
      this.viewCtrl.dismiss();
    }
    delete(i,p)
    {
      this.totalePrice=this.totalePrice - parseInt(p);
      this.storage.set('totalePrice', this.totalePrice);
        this.cr.splice(i, 1);
        this.storage.set('cartData', this.cr);
      
    }
    order(){
      this.itemList.push({
        order : this.cr,
        totalprice : this.totalePrice ,
        restaurant_key : this.rKey ,
        tableNumber : this.tableNumber 
        
       
      })
      this.userOrder();
      this.totalePrice =0;
      this.cr =[];
      this.storage.set('totalePrice', this.totalePrice);
      this.storage.set('cartData', this.cr);
     
    }
    userOrder(){
      this.cr.forEach( (element) => {
        
        this.itemOrder.push({
          orderName : element.name ,
          userId : this.myid ,
  
          
         
        })
    });

    }
}
