import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreChainsPage } from '../pages/storechains/storechains';
import { StoresByChainPage } from '../pages/storesbychain/storesbychain';
import { StoreChainApiProvider } from '../providers/store-chain-api/store-chain-api';
import { StoreApiProvider } from '../providers/store-api/store-api';
import { StorePage } from '../pages/store/store';

@NgModule({
  declarations: [
    MyApp,
    StoreChainsPage,
    StoresByChainPage,
    StorePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StoreChainsPage,
    StoresByChainPage,
    StorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpModule,
    GoogleMaps,
    StoreChainApiProvider,
    StoreApiProvider
  ]
})
export class AppModule {}
