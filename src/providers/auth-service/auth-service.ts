import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, QueryFn } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
 /*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  itemList: AngularFireList<any>;
  private user : firebase.User
  public isLoggedIn: Boolean = false;
  constructor(private storage: Storage, public db: AngularFireDatabase ,public afAuth:AngularFireAuth) {
    console.log('Hello AuthServiceProvider Provider');

    afAuth.authState.subscribe(user => {
      this.user = user
    })

    this.itemList = db.list('users');
  }


  signInWithEmail(credentials){
    console.log('sign in with email')
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(user => {
      this.isLoggedIn = true;
      this.storage.set('isLoggedIn', 'true');
      this.storage.set('email', this.afAuth.auth.currentUser.email );

      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          this.storage.set('uid', auth.uid );

        }
      });
    }).catch(error => {
      console.error(error);
      alert(error);
    });
  }


  signUp(credentials){
    console.log('register   with email')
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      this.isLoggedIn = true;
      this.storage.set('isLoggedIn', 'true');
      this.storage.set('email', this.afAuth.auth.currentUser.email );
    }).then(() =>{

      this.storage.set('uid', this.afAuth.auth.currentUser.uid );
  this.itemList.push({
    email: this.afAuth.auth.currentUser.email ,
    uid : this.afAuth.auth.currentUser.uid,
    name : ''  ,
    phone :  '' ,
    age : '' ,
    address :  '' ,
    city :  '' ,
    image: '../../assets/./imgs/./person.png'
  });

    }).catch( error => {
      console.error(error);
      alert(error);
  
    });
  
  }


  signInWithGoogle(){
    console.log('sign in with google')
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider()).then(user => {
      this.isLoggedIn = true;
      this.storage.set('isLoggedIn', 'true');
      this.storage.set('email', this.afAuth.auth.currentUser.email );
  

          this.storage.set('uid', this.afAuth.auth.currentUser.uid);
  this.itemList.push({
    email: this.afAuth.auth.currentUser.email ,
    uid : this.afAuth.auth.currentUser.uid,
    name : ''  ,
    phone :  '' ,
    age : '' ,
    address :  '' ,
    city :  '' ,
    image: '../../assets/./imgs/./person.png'
  });

    }).catch( error => {
      console.error(error);
      alert(error);
  
    });
  }

  signInWithFacebook() {
    console.log('sign in with facebook')
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
      this.isLoggedIn = true;
      this.storage.set('isLoggedIn', 'true');
      this.storage.set('email', this.afAuth.auth.currentUser.email );
  
      
          this.storage.set('uid', this.afAuth.auth.currentUser.uid);
  this.itemList.push({
    email: this.afAuth.auth.currentUser.email ,
    uid : this.afAuth.auth.currentUser.uid,
    name : ''  ,
    phone :  '' ,
    age : '' ,
    address :  '' ,
    city :  '' ,
    image: '../../assets/./imgs/./person.png'
  });

    }).catch( error => {
      console.error(error);
      alert(error);
  
    });
  }

  signOut(): Promise<any>{
    
return this.afAuth.auth.signOut().then(() =>{
  this.isLoggedIn = false;
  this.storage.set('isLoggedIn', 'false');
  this.storage.set('email', '' );
  this.storage.set('uid', '' );

});
  }


  getUid() {
    return this.afAuth.authState.map((auth) =>  {
       if(auth == null) {
         return '';
       } else {
         return auth.uid;
       }
     });
 }

}