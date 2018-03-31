import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { ProductListPage } from '../product-list/product-list';

@Component({
  selector: 'page-productlists',
  templateUrl: 'productlists.html',
})
export class ProductListsPage {

  public productLists = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productListApi: ProductListApiProvider,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({
      'content': 'Loading Product Lists...'
    });

    loading.present().then(() => {
      this.productListApi.getProductLists().then(data => {
        this.productLists = (<any>data).data;
        loading.dismiss();
      });
    });
  }

  itemTapped($event, item){
    this.navCtrl.push(ProductListPage, item);
  }

  createTapped($event){
    console.log('create Tapped');
  }

  itemPressed($event, item){
    console.log('item pressed');
  }

}
