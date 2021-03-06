import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreChainsPage } from '../pages/storechains/storechains';
import { StoresByChainPage } from '../pages/storesbychain/storesbychain';
import { StoreChainApiProvider } from '../providers/store-chain-api/store-chain-api';
import { StoreApiProvider } from '../providers/store-api/store-api';
import { StorePage } from '../pages/store/store';
import { ConfigProvider } from '../providers/config/config';
import { ProductsPage } from '../pages/products/products';
import { ProductApiProvider } from '../providers/product-api/product-api';
import { ProductPage } from '../pages/product/product';
import { ProductListsPage } from '../pages/productlists/productlists';
import { ProductListApiProvider } from '../providers/product-list-api/product-list-api';
import { ProductListPage } from '../pages/product-list/product-list';
import { ProductListAddPage } from '../pages/product-list-add/product-list-add';
import { ProductListProductAddPage } from '../pages/product-list-product-add/product-list-product-add';
import { ProductListQuotePage } from '../pages/product-list-quote/product-list-quote';
import { ProductListQuoteDetailPage } from '../pages/product-list-quote-detail/product-list-quote-detail';

@NgModule({
  declarations: [
    MyApp,
    StoreChainsPage,
    StoresByChainPage,
    StorePage,
    ProductsPage,
    ProductPage,
    ProductListsPage,
    ProductListPage,
    ProductListAddPage,
    ProductListProductAddPage,
    ProductListQuotePage,
    ProductListQuoteDetailPage
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
    StorePage,
    ProductsPage,
    ProductPage,
    ProductListsPage,
    ProductListPage,
    ProductListAddPage,
    ProductListProductAddPage,
    ProductListQuotePage,
    ProductListQuoteDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpModule,
    Geolocation,
    LaunchNavigator,
    StoreChainApiProvider,
    StoreApiProvider,
    ProductApiProvider,
    ProductListApiProvider,
    ConfigProvider
  ]
})
export class AppModule {}
