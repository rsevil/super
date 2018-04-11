import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { ProductPage } from '../product/product';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-product-list-quote-detail',
  templateUrl: 'product-list-quote-detail.html',
})
export class ProductListQuoteDetailPage {

  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  public productListDetail:any;
  public quoteProducts = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController,
    public productListApi: ProductListApiProvider,
    public geolocation: Geolocation) {
      console.log(this.navParams.data);
      this.productListDetail = this.navParams.data;
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create();

    loading.present().then(() => {
      this.productListApi.getProductListQuoteProducts(this.productListDetail.id, this.productListDetail.quote.storeId).then(data => {
        this.quoteProducts = <any[]>data;
        this.loadGoogleMaps();
        loading.dismiss();
      });
    });
  }

  productTapped($event, item){
    this.navCtrl.push(ProductPage, item);
  }

  loadGoogleMaps(){
    if(typeof google == "undefined" || typeof google.maps == "undefined"){

      console.log("Google maps JavaScript needs to be loaded.");
      console.log("loading map");

      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
      }

      let script = document.createElement("script");
      script.id = "googleMaps";

      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
      }

      document.body.appendChild(script); 
    }else{
      this.initMap();
    }
  }
 
  initMap(){
    this.mapInitialised = true;
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    });
  }

}
