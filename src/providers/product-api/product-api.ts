import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class ProductApiProvider {

  constructor(
    public http: Http,
    public config: ConfigProvider) {
  }

  getProducts(){
    return new Promise(resolve => 
      this.http
        .get(`${this.config.get().api.baseUrl}/product`, { 
          params: { 
            'PageParams.StartIndex': 0, 
            'PageParams.Length': 999 
          } 
        })
        .subscribe(res => resolve(res.json())));
  }

  getProductDetail(productId){
    return new Promise(resolve => 
      this.http
      .get(`${this.config.get().api.baseUrl}/product/detail`, {
        params: { 
          'id': productId
        } 
      })
      .subscribe(res => resolve(res.json())));
  }

}
