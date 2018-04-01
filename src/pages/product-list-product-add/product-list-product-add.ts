import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductApiProvider } from '../../providers/product-api/product-api';

@Component({
  selector: 'page-product-list-product-add',
  templateUrl: 'product-list-product-add.html',
})
export class ProductListProductAddPage {

  public form: FormGroup;
  public products = [];
  public selectedProduct:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public viewController: ViewController,
    public loadingController: LoadingController,
    public productsApi: ProductApiProvider) {
      this.form = this.formBuilder.group({
        id: [''],
        quantity:['',Validators.compose([Validators.min(0), Validators.max(99)])] 
      });
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({
      content: 'Loading Products...'
    });

    loading.present().then(() => {
      this.productsApi.getProducts().then(data => {
        this.products = (<any>data).data;
        if (this.viewController.data.id)
          this.form.setValue({
            id: this.viewController.data.id,
            quantity: this.viewController.data.quantity
          });
        loading.dismiss();
      });
    });
  }

  save(){
    if (!this.form.value.id || !this.form.value.quantity)
      return;

    var data = this.form.value;
    data.name = this.products.find((v,i) => {
      return v.id == this.form.value.id
    }).name;
    this.viewController.dismiss(data);
  }

}
