import { Http } from '@angular/http'; 
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class StoreChainApiProvider {

  constructor(
    public http: Http,
    public config: ConfigProvider) {
    
  }

  getStoreChains(){
    return new Promise(resolve => 
      this.http
        .get(`${this.config.get().api.baseUrl}/storechain`, { 
          params: { 
            'PageParams.StartIndex': 0, 
            'PageParams.Length': 999 
          } 
        })
        .subscribe(res => resolve(res.json())));
  }

}
