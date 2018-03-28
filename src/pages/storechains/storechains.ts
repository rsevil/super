import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
    private storeChainApi: StoreChainApiProvider,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad(){
    let loader = this.loadingController.create({
      content: 'Loading Store Chains...'
    });

    loader.present().then(() => {
      this.storeChainApi.getStoreChains().then(data => {
          this.storeChains = (<any>data).data
          loader.dismiss();
        });
    });
  }

  itemTapped($event, storeChain){
    this.navCtrl.push(StoresByChainPage, storeChain);
  }
}
