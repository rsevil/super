import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductApiProvider } from '../../providers/product-api/product-api';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public product;
  public productDetail;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productApi: ProductApiProvider,
    public loadingController: LoadingController) {
      this.product = this.navParams.data;
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      'content': 'Loading Product...'
    });

    loader.present().then(() => {
      this.productApi.getProductDetail(this.product.id).then(data => {
        this.productDetail = data;
        loader.dismiss();
      })
    });
  }

}
