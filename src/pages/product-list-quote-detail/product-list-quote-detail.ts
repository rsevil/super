import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-product-list-quote-detail',
  templateUrl: 'product-list-quote-detail.html',
})
export class ProductListQuoteDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListQuoteDetailPage');
  }

}
