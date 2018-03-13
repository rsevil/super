import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreChainsPage } from '../pages/storechains/storechains';
import { StoreChainApiProvider } from '../providers/store-chain-api/store-chain-api';
import { StoresbychainPage } from '../pages/storesbychain/storesbychain';
import { StoreApiProvider } from '../providers/store-api/store-api';

@NgModule({
  declarations: [
    MyApp,
    StoreChainsPage,
    StoresbychainPage
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
    StoresbychainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpModule,
    StoreChainApiProvider,
    StoreApiProvider
  ]
})
export class AppModule {}
