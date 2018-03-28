import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StoreChainsPage } from '../pages/storechains/storechains';
import { ProductsPage } from '../pages/products/products';
import { ProductListsPage } from '../pages/productlists/productlists';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ProductListsPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToHome(){
    this.nav.popToRoot();
  }

  goToProducts(){
    this.nav.push(ProductsPage);
  }

  goToStoreChains(){
    this.nav.push(StoreChainsPage);
  }
}
