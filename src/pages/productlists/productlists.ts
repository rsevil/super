import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { ProductListPage } from '../product-list/product-list';
import { ProductListAddPage } from '../product-list-add/product-list-add';

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
    public loadingController: LoadingController,
    public modalController: ModalController) {
  }

  ionViewDidLoad() {
  }

  loadProductLists(){
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

  ionViewDidEnter(){
    this.loadProductLists();
  }

  itemTapped($event, item){
    this.navCtrl.push(ProductListPage, item);
  }

  createTapped($event){
    this.navCtrl.push(ProductListAddPage);
  }

  editTapped($event, item){
    let loading = this.loadingController.create();

    loading.present().then(() => {
      this.productListApi.getProductListDetail(item.id).then(productListDetail => {
        loading.dismiss();
        this.navCtrl.push(ProductListAddPage, productListDetail);
      });
    });
  }

  deleteTapped($event, item) {
    let loading = this.loadingController.create({
      content: 'Deleting Product List...'
    });

    loading.present().then(() => {
      this.productListApi.deleteProductList(item.id).then(() => {
        this.productLists = this.productLists.filter(v => v != item);
        loading.dismiss();
      });
    });
  }

  showLoading(){
    
  }

}
