import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreApiProvider } from '../../providers/store-api/store-api';

@Component({
  selector: 'page-storesbychain',
  templateUrl: 'storesbychain.html',
})
export class StoresByChainPage {

  public stores: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storeApi: StoreApiProvider) {
  }

  ionViewDidLoad() {
    let selectedStoreChain = this.navParams.data;
    this.storeApi
      .getStoresByChainId(selectedStoreChain.Id)
      .then(data => this.stores = (<any>data).data);
  }

}
