import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

  constructor() {
  }

  get(){
    return {
      api: {
        baseUrl: 'http://supermerk2.azurewebsites.net/api'
        //baseUrl: 'http://localhost:5490/api'
      },
      googleMaps: {
        apiKey: 'AIzaSyAbV4YWl_1OsDCb4mc94vGIEGNQy5foBYE'
      }
    };
  }
}
