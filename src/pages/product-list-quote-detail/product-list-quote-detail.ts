import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-product-list-quote-detail',
  templateUrl: 'product-list-quote-detail.html',
})
export class ProductListQuoteDetailPage {

  public productListDetail:any;
  public quoteProducts = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController,
    public productListApi: ProductListApiProvider) {
      this.productListDetail = this.navParams.data;
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create();

    loading.present().then(() => {
      this.productListApi.getProductListQuoteProducts(this.productListDetail.id, this.productListDetail.quote.storeId).then(data => {
        this.quoteProducts = <any[]>data;
        loading.dismiss();
      });
    });
  }

  productTapped($event, item){
    this.navCtrl.push(ProductPage, item);
  }

}
