import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { ProductPage } from '../product/product';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ConfigProvider } from '../../providers/config/config';

declare var google;

@Component({
  selector: 'page-product-list-quote-detail',
  templateUrl: 'product-list-quote-detail.html',
})
export class ProductListQuoteDetailPage {

  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;

  public productListDetail:any;
  public quoteProducts = [];

  public start:any;

  public travelTime;
  public travelDistance;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController,
    public productListApi: ProductListApiProvider,
    public geolocation: Geolocation,
    public launchNavigator: LaunchNavigator,
    public config: ConfigProvider) {
      console.log(this.navParams.data);
      this.productListDetail = this.navParams.data;
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create();

    loading.present().then(() => {
      this.productListApi.getProductListQuoteProducts(this.productListDetail.id, this.productListDetail.quote.storeId).then(data => {
        this.quoteProducts = <any[]>data;
        this.loadGoogleMaps(() => loading.dismiss());
      });
    });
  }

  productTapped($event, item){
    this.navCtrl.push(ProductPage, item);
  }

  loadGoogleMaps(loadingDismiss){
    if(typeof google == "undefined" || typeof google.maps == "undefined"){

      console.log("Google maps JavaScript needs to be loaded.");
      console.log("loading map");

      //Load the SDK
      window['mapInit'] = () => {
        this.initMap(loadingDismiss);
      }

      let script = document.createElement("script");
      script.id = "googleMaps";
      script.src = 'http://maps.google.com/maps/api/js?key=' + this.config.get().googleMaps.apiKey + '&callback=mapInit';

      document.body.appendChild(script); 
    }else{
      this.initMap(loadingDismiss);
    }
  }
 
  initMap(loadingDismiss){
    this.mapInitialised = true;
    this.geolocation.getCurrentPosition().then((position) => {
      this.start = {
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      };
      let start = new google.maps.LatLng(this.start.latitude, this.start.longitude);

      this.map = new google.maps.Map(
        this.mapElement.nativeElement, 
        {
          center: start,
          zoom: 15,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

      google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
        // https://developers.google.com/maps/documentation/javascript/directions?hl=es-419#InspectingResults
        let directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(this.map);

        let end = new google.maps.LatLng(this.productListDetail.quote.latitude, this.productListDetail.quote.longitude);

        let request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        };

        let directionsService = new google.maps.DirectionsService();
        directionsService.route(request, (response, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            let point = response.routes[0].legs[0];
            this.travelTime = point.duration.text;
            this.travelDistance = point.distance.text;
            directionsDisplay.setMap(this.map);
          } else {
            console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
          }
          loadingDismiss();
        });
      });
    });
  }

  navigateTapped(){
    // https://stackoverflow.com/questions/46746941/ionic-2-open-google-maps-with-directions-from-2-locations
    let options: LaunchNavigatorOptions = {
      start:<any>[this.start.latitude, this.start.longitude]
    };
    let destination = <any>[this.productListDetail.quote.latitude, this.productListDetail.quote.longitude];

    this.launchNavigator.navigate(destination, options)
      .then(() => {}, (err) => console.log(err));
  }

}
