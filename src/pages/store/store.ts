import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { StoreApiProvider } from '../../providers/store-api/store-api';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ConfigProvider } from '../../providers/config/config';

declare var google;

@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  public store: any;
  public storeDetail: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  public start:any;

  public travelTime;
  public travelDistance;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storeApi: StoreApiProvider,
    public loadingController: LoadingController,
    public geolocation: Geolocation,
    public launchNavigator: LaunchNavigator,
    public config: ConfigProvider) {
      this.store = this.navParams.data;
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content:'Loading Store...'
    });

    loader.present().then(() => {
      this.storeApi.getStoreDetail(this.store.id).then(data => {
          this.storeDetail = data
          this.loadGoogleMaps(() => loader.dismiss());
        });
    });
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
      let origin = new google.maps.LatLng(this.start.latitude, this.start.longitude);
      let destination = new google.maps.LatLng(this.storeDetail.latitude, this.storeDetail.longitude);

      this.map = new google.maps.Map(
        this.mapElement.nativeElement, 
        {
          center: destination,
          zoom: 15,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

      google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
        this.addMarker(destination)

        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: origin, 
            destination: destination, 
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route( request, ( response, status ) => {
          if (status == google.maps.DirectionsStatus.OK) {
                var point = response.routes[ 0 ].legs[ 0 ];
                this.travelTime = point.duration.text;
                this.travelDistance = point.distance.text;
          }

            loadingDismiss();
        } );
      });
    });
  }

  addMarker(position){
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
  }

  navigateTapped(){
    // https://stackoverflow.com/questions/46746941/ionic-2-open-google-maps-with-directions-from-2-locations
    let options: LaunchNavigatorOptions = {
      start:<any>[this.start.latitude, this.start.longitude]
    };
    let destination = <any>[this.storeDetail.latitude, this.storeDetail.longitude];

    this.launchNavigator.navigate(destination, options)
      .then(() => {}, (err) => console.log(err));
  }
}
