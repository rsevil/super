import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'; 
import { Injectable } from '@angular/core';

/*
  Generated class for the StoreChainApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreChainApiProvider {

  private baseUrl = 'http://localhost:5490/api'

  constructor(public http: Http) {
    
  }

  getStoreChains(){
    return new Promise(resolve => 
      this.http
        .get(`${this.baseUrl}/storechain`, { 
          params: { 
            'PageParams.StartIndex': 0, 
            'PageParams.Length': 999 
          } 
        })
        .subscribe(res => resolve(res.json())));
  }

}
