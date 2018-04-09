import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { ProductPage } from '../product/product';
import { ProductListQuotePage } from '../product-list-quote/product-list-quote';

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  public productList: any;
  public productListDetail: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productListApi: ProductListApiProvider,
    public loadingController: LoadingController) {
      this.productList = this.navParams.data
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      'content': 'Loading Product List...'
    });

    loader.present().then(() => {
      this.productListApi.getProductListDetail(this.productList.id).then(data => {
        this.productListDetail = data;
        loader.dismiss();
      })
    });
  }

  itemTapped($event, item){
    this.navCtrl.push(ProductPage, item);
  }

  goToQuote(){
    this.navCtrl.push(ProductListQuotePage, this.productListDetail);
  }

}
