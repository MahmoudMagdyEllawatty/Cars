import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SelectServicesPage} from './pages/packages/select-services/select-services.page';
import {SelectServicesPageModule} from './pages/packages/select-services/select-services.module';
import {SelectGroupsPageModule} from './pages/packages/select-groups/select-groups.module';

import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslateConfigService} from './services/translate-config.service';

import { IonicStorageModule} from '@ionic/storage';
import {LanguagePopoverPageModule} from './pages/language-popover/language-popover.module';
import {AngularFireStorageModule} from '@angular/fire/storage';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      IonicStorageModule.forRoot(),
    HttpClientModule,
    NgxIonicImageViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firabase),
      AngularFireAuthModule, AngularFireStorageModule,
    AngularFirestoreModule, SelectServicesPageModule, SelectGroupsPageModule, LanguagePopoverPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateConfigService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
