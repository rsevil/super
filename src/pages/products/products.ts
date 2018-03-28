import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductApiProvider } from '../../providers/product-api/product-api';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  public products = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productApi: ProductApiProvider,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({
      'content': 'Loading Products...'
    });

    loading.present().then(() => {
      this.productApi.getProducts().then(data => {
        this.products = (<any>data).data;
        loading.dismiss();
      });
    });
  }

  itemTapped($event, item){
    this.navCtrl.push(ProductPage, item);
  }
}
