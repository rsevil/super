import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

  constructor() {
  }

  get(){
    return {
      api: {
        baseUrl: 'http://supermerk2.azurewebsites.net/api'
      }
    };
  }
}
