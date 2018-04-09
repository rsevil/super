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

  addProductList(productList){
    return new Promise(resolve => 
      this.http
        .post(`${this.config.get().api.baseUrl}/productlist`, productList)
        .subscribe(res => resolve(res.json())));
  }

  updateProductList(productList){
    return new Promise(resolve => 
      this.http
        .put(`${this.config.get().api.baseUrl}/productlist`, productList)
        .subscribe(res => resolve(res.ok)));
  }

  deleteProductList(productListId){
    return new Promise(resolve => 
      this.http
        .delete(`${this.config.get().api.baseUrl}/productlist`, { 
          params: {
            'id': productListId
          } 
        })
        .subscribe(res => resolve(res.ok)));
  }

  getProductListQuote(productListId, latitude, longitude){
    return new Promise(resolve => 
      this.http
      .get(`${this.config.get().api.baseUrl}/productlist/quote`, {
        params: { 
          id: productListId,
          latitude: latitude,
          longitude: longitude,
          'PageParams.StartIndex': 0, 
          'PageParams.Length': 999 
        } 
      })
      .subscribe(res => resolve(res.json())));
  }

  getProductListQuoteProducts(productListId, storeId){
    return new Promise(resolve => 
      this.http
      .get(`${this.config.get().api.baseUrl}/productlist/quoteproducts`, {
        params: { 
          id: productListId,
          storeId: storeId
        } 
      })
      .subscribe(res => resolve(res.json())));
  }

}
