import { AddMapPosPage } from './../add-map-pos/add-map-pos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ViewChild , ElementRef } from '@angular/core'
import { location } from '../../model/location'
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database'
import { Geolocation } from '@ionic-native/geolocation';

declare var google:any

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lat: number;
  lng: number;
  @ViewChild('map') mapElement:ElementRef
 
  map:any
  itemList : AngularFireList<any>
  itemArray  = []
  constructor(public navCtrl: NavController ,
              public geo: Geolocation,
              public navParams: NavParams,
              public db:AngularFireDatabase,
              alertCtrl:AlertController
            
  ) {
    this.itemList = db.list('addPosMap')

  }
  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch( err => console.log(err));
    this.loadMap();
  }
  addPos(){
    this.navCtrl.push(AddMapPosPage);
  }

  loadMap(){
   
    this.geo.getCurrentPosition().then( pos => {
      var position = {
        lat : pos.coords.latitude , 
        lng :pos.coords.longitude
      }
      // this.lat = pos.coords.latitude;
      // this.lng = pos.coords.longitude;
    
    
    let LatLng = new google.maps.LatLng( position);
    let mapOptions = {
      center:LatLng,
      zoom: 16,
  mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
  
  
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
  
  
  this.itemList.snapshotChanges().subscribe(actions => {
  actions.forEach(action=>{
    let y = action.payload.toJSON()
    y['key'] = action.key
    this.itemArray.push(y as location)
  })
  console.log('itemArray: '+ this.itemArray)
  
  for (const value of this.itemArray) {
    let marker = new google.maps.Marker(
      
      {
      position : new google.maps.LatLng(value['latitude'],value['longitude']),
      map: this.map
    });
    let mypos = new google.maps.Marker(
      
      {
      position : new google.maps.LatLng(position),
      map: this.map,
      icon : './assets/icon/mypos.png'
    });
    marker.info = new google.maps.InfoWindow({
    content: value['info']
  })
  mypos.setMap(this.map)
  
  google.maps.event.addListener(marker , 'click' , function(){
    let marker_map = this.getMap();
    this.info.open(marker_map,this);
    
  });
  marker.addListener('click', function() {
    this.map.setZoom(20);
    this.map.setCenter(marker.getPosition());
  });
  marker.addListener('dblclick', function() {

  });
  }
  })
})
  }

}
