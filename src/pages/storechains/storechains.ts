import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoreChainApiProvider } from '../../providers/store-chain-api/store-chain-api';
import { StoresByChainPage } from '../storesbychain/storesbychain';

@Component({
  selector: 'page-storechains',
  templateUrl: 'storechains.html'
})
export class StoreChainsPage {

  public storeChains = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storeChainApi: StoreChainApiProvider) {
  }

  ionViewDidLoad(){
    this.storeChainApi
      .getStoreChains()
      .then(data => this.storeChains = (<any>data).data)
  }

  itemTapped($event, storeChain){
    this.navCtrl.push(StoresByChainPage, storeChain);
  }
}
