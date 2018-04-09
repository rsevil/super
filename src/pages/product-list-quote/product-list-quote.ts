import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { ProductListQuoteDetailPage } from '../product-list-quote-detail/product-list-quote-detail';

@Component({
  selector: 'page-product-list-quote',
  templateUrl: 'product-list-quote.html',
})
export class ProductListQuotePage {

  public productListDetail:any;
  public productListQuotes = [];

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
        this.productListApi
          .getProductListQuote(
              this.productListDetail.id,
              position.coords.latitude,
              position.coords.longitude)
          .then(data => {
              this.productListQuotes = (<any>data).data;
              loading.dismiss();
          })
      }, err => console.log(err));
    });
  }

  itemTapped($event, item){
    this.navCtrl.push(
      ProductListQuoteDetailPage, {
        id: this.productListDetail.id, 
        quote: item
    });
  }
}
