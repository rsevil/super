import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductListApiProvider } from '../../providers/product-list-api/product-list-api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductListProductAddPage } from '../product-list-product-add/product-list-product-add';

@Component({
  selector: 'page-product-list-add',
  templateUrl: 'product-list-add.html',
})
export class ProductListAddPage {

  public editMode: boolean;
  public form: FormGroup;
  public productListProducts: IProductListProduct[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public productListApi: ProductListApiProvider,
    public modalController: ModalController) {
      this.form = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30)])]
      });
  }

  ionViewDidLoad() {
    this.editMode = false;
    if (!this.navParams.data.id)
      return;

    this.editMode = true;
    this.form.addControl('id', this.formBuilder.control(''));
    this.form.setValue({
      id: this.navParams.data.id,
      name: this.navParams.data.name
    });
    this.productListProducts = this.navParams.data.products;
  }

  createItem() {
    let modal = this.modalController.create(ProductListProductAddPage);
    modal.onDidDismiss(item => {
      if (!item)
        return;

      this.productListProducts = this.productListProducts.concat([item]);
    });
    modal.present();
  }

  save(){
    if(!this.form.valid || !this.form.value.name || !this.productListProducts.length)
      return;

    var productList = this.form.value;
    productList.products = this.productListProducts;
    if (!this.editMode){
      this.productListApi.addProductList(productList).then((id) => {
        this.navCtrl.pop();
      });
    }else{
      this.productListApi.updateProductList(productList).then(() => {
        this.navCtrl.pop();
      })
    }
  }

  editTapped($event, product){
    let modal = this.modalController.create(ProductListProductAddPage, product);
    modal.onDidDismiss(item => {
      if (!item)
        return;

      let indexOfProduct = this.productListProducts.indexOf(product);
      this.productListProducts[indexOfProduct] = item;
    });
    modal.present();
  }

  deleteTapped($event, product){
    this.productListProducts = this.productListProducts
      .filter((e,i) => e != product);
  }

}

export interface IProductListProduct
{
  id?: string,
  name?: string,
  quantity?: number
}