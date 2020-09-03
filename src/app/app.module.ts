import { NewsCardComponent } from './components/vari/news-card/news-card';
import { BachecaCardComponent } from './components/vari/bacheca-card/bacheca-card';
import { ComponentsModule } from './components/components.module';
import { HttpService } from './services/shared/http.service';
import { ConstantsService } from './services/shared/constants.service';
import { AlertService } from './services/shared/alert.service';
import { LoginService } from './services/login/login.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ContactService } from './services/contact/contact.service';
import { CheckService } from './services/shared/check.service';
import { ErrorService } from './services/shared/error.service';
import { StoreService } from './services/store/store.service';
import { ComunicazioneService } from './services/comunicazione.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { ChatCardComponent } from './components/vari/chat-card/chat-card';
import { ComunicazioniCardComponent } from './components/vari/comunicazioni-card/comunicazioni-card';
import { ContactCardComponent } from './components/vari/contact-card/contact-card';
import { DocumentaleCardComponent } from './components/vari/documentale-card/documentale-card';
import { MessaggiCardComponent } from './components/vari/messaggi-card/messaggi-card';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IconNameService } from './services/shared/iconname.service';

@NgModule({
  declarations: [
    AppComponent,
    // BachecaCardComponent,
    // ChatCardComponent,
    // ComunicazioniCardComponent,
    // ContactCardComponent,
    // DocumentaleCardComponent,
    // MessaggiCardComponent,
    // NewsCardComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    ComponentsModule,
    CommonModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    ContactService,
    LoginService,
    AlertService,
    CheckService,
    ConstantsService,
    ErrorService,
    HttpService,
    StoreService,
    ComunicazioneService,
    IconNameService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
