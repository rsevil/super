import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';

@Component({
  selector: 'page-product-list-quote',
  templateUrl: 'product-list-quote.html',
})
export class ProductListQuotePage {

  public productListDetail:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation,
    public loadingController: LoadingController,
    public productListApi: ProductListApiProvider) {
      this.productListDetail = this.navParams.data;
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create();

    loading.present().then(() => {
      this.geolocation.getCurrentPosition().then(position => {
        console.log(position);
        this.productListApi
          .getProductListQuote(
              this.productListDetail.id,
              position.coords.latitude,
              position.coords.longitude)
          .then(data => {
              console.log(data);
              loading.dismiss();
          })
      }, err => console.log(err));
    });
  }
}
