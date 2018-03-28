import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class StoreApiProvider {

  constructor(
    public http: Http,
    public config: ConfigProvider) {
  }

  getStoresByChainId(storeChainId){
    return new Promise(resolve =>
      this.http
        .get(`${this.config.get().api.baseUrl}/store`, {
          params: { 
            'ChainId': storeChainId, 
            'PageParams.StartIndex': 0, 
            'PageParams.Length': 999 
          } 
        })
        .subscribe(res => resolve(res.json())));
  }

  getStoreDetail(storeId){
    return new Promise(resolve => 
      this.http
      .get(`${this.config.get().api.baseUrl}/store/detail`, {
        params: { 
          'id': storeId
        } 
      })
      .subscribe(res => resolve(res.json())));
  }

}
