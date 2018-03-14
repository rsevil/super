import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoreApiProvider } from '../../providers/store-api/store-api';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  public store: any;
  public storeDetail: any;
  public map: GoogleMap;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storeApi: StoreApiProvider,
    public googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    this.store = this.navParams.data;
    this.storeApi
      .getStoreDetail(this.store.id)
      .then(data => this.storeDetail = data);
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });
  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }
}
