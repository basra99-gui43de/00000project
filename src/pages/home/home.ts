import { AboutPage } from './../about/about';
import { Component ,ViewChild} from '@angular/core';
import { NavController ,Slides} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BarcodeScanner  } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  itemList: AngularFireList<any>;
  dt: Observable<any[]>;
  itemArray = [];
  duplicated=[];
  myArr=[];
codedata={
rkey:'-LRkEWRg-9mqftjuI1uj',
tnum:'6'
};
email='';
uid='';
myid='';
x:any;
count = 0;
data = {
  name : '' ,
 };
 h=0;
encodedData={};
@ViewChild(Slides) slides: Slides;
  constructor(public fire:AngularFireAuth,public storage: Storage,private barcodeScanner: BarcodeScanner,public db:AngularFireDatabase,
    public navCtrl: NavController,public authServiceProvider:AuthServiceProvider) {
      this.authServiceProvider.getUid().subscribe(uid=>{
        this.myid= uid;
        console.log(uid)
      })
   
     setTimeout( () => {
    this.h=1;  
  this.ionViewDidEnter();
 }, 5000);
     
  this.getUserOrder();
      this.su();

     
  }

  ionViewDidEnter() {
    this.myArr=[];
    this.duplicated=[];
this.slides.autoplayDisableOnInteraction = false;
this.su();
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

  getDuplicated(arra1) {
      const object = {};
        const result = [];

        arra1.forEach(item => {
          if(!object[item])
              object[item] = 0;
            object[item] += 1;
        })

        for (const prop in object) {
           if(object[prop] >= 2) {
               result.push(prop);
           }
        }

        return result;
  }

  getUserOrder(){
    //****** */
   
    this.itemList = this.db.list('userOrder');
    this.itemList.snapshotChanges()
    .subscribe(actions => {
      this.itemArray=[];
          actions.forEach(action => {
            actions.map(action => ({ ['$key']: action.key, ...action.payload.val() }));

            const y = action.payload.toJSON();
            y['$key'] = action.key;
            if (action.payload.child('userId').val() === this.myid ) {
              
              
              this.itemArray.push(y as ListItemClass);
              //this.data.name = this.itemArray[0]['name'];
         
            }              
});
    });

      //****** */

   

   }
  
su(){

  for (let index = 0; index < this.itemArray.length; index++) {
   const element = this.itemArray[index];
   console.log(element.orderName +'-'+index);
   this.myArr.push(element.orderName)
 }
   this.x=this.getDuplicated(this.myArr)
   console.log('--------------------');
   this.x.forEach(element => {
      
     for(var i = 0; i < this.myArr.length; ++i){
         if(this.myArr[i] == element)
            this.count++;
     }
     if (this.count >= 3) {
         this.duplicated.push({
       name:element,
       count:this.count
     })
     }
   
  
      console.log(element +'=>'+this.count);
      this.count=0;
   });

  

}
go(){
  this.navCtrl.push(AboutPage);
}
}
export class ListItemClass {
  $key: string;
  name: string;

}