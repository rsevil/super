import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
    private storeApi: StoreApiProvider,
    public loadingController: LoadingController) {
      this.storeChain = this.navParams.data;
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Loading Stores by Chain...'
    });

    loader.present().then(() => {
      this.storeApi.getStoresByChainId(this.storeChain.id).then(data => {
          this.stores = (<any>data).data;
          loader.dismiss();
        });
    });
  }

  itemTapped($event, store){
    this.navCtrl.push(StorePage, store);
  }

}
