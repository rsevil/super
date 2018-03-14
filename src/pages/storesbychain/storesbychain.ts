import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoreApiProvider } from '../../providers/store-api/store-api';
import { StorePage } from '../store/store';

@Component({
  selector: 'page-storesbychain',
  templateUrl: 'storesbychain.html',
})
export class StoresByChainPage {

  public storeChain:any;
  public stores = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storeApi: StoreApiProvider) {
  }

  ionViewDidLoad() {
    this.storeChain = this.navParams.data;
    this.storeApi
      .getStoresByChainId(this.storeChain.id)
      .then(data => this.stores = (<any>data).data);
  }

  itemTapped($event, store){
    this.navCtrl.push(StorePage, store);
  }

}
