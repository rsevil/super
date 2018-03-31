import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class ProductListApiProvider {

  constructor(
    public http: Http,
    public config: ConfigProvider) {
  }

  getProductLists(){
    return new Promise(resolve => 
      this.http
        .get(`${this.config.get().api.baseUrl}/productlist`, {
          params: { 
            'PageParams.StartIndex': 0, 
            'PageParams.Length': 999 
          } 
         })
         .subscribe(res => resolve(res.json())));
  }

  getProductListDetail(productListId){
    return new Promise(resolve => 
      this.http
      .get(`${this.config.get().api.baseUrl}/productlist/detail`, {
        params: { 
          'id': productListId
        } 
      })
      .subscribe(res => resolve(res.json())));
  }

}
