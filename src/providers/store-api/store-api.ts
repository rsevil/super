import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreApiProvider {

  private baseUrl = 'http://localhost:5490/api'

  constructor(public http: Http) {
  }

  getStoresByChainId(storeChainId){
    return new Promise(resolve =>
      this.http
        .get(`${this.baseUrl}/store`, {
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
      .get(`${this.baseUrl}/store/detail`, {
        params: { 
          'id': storeId
        } 
      })
      .subscribe(res => resolve(res.json())));
  }

}
