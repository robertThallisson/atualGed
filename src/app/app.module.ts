import { ConfiguracaoCertificadoPageModule } from './pages/empresa/configuracao-certificado/configuracao-certificado.module';
import { MBIPipeModule } from './pipes/mbipipe.module';
import { FormsModule } from '@angular/forms';
import { DataModalPage } from './components/data-input/data-modal/data-modal.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CustomListModalPage } from './components/custom-list-modal/custom-list-modal.page';
import { PesquisarItemPage } from './components/pesquisar-item/pesquisar-item.page';
import { InputFileComponent } from './components/input-file/input-file.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuPageModule } from './menu/menu.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrMaskerModule } from 'br-mask';
import { SearchSelectableModule } from './components/search-selectable/search-selectable.module';
import { DataInputModule } from './components/data-input/data-input.module';
import { CustomMenuModule } from './components/custom-menu/custom-menu.module';
import { InputMbiModule } from './components/input/input-mbi/input-mbi.module';
import { CalendarModule } from 'ion2-calendar';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AuthGuardService } from './service/autentificacao/auth-guard-service.service';
import { AutentificacaoService } from './service/autentificacao/autentificacao.service';
import { CurrencyPipe } from '@angular/common';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { PhotoService } from './service/camera/photo.service';


@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    CustomListModalPage,
    DataModalPage,
    PesquisarItemPage,
    InputFileComponent
  ],
  entryComponents: [
    NotificationsComponent,
    CustomListModalPage,
    DataModalPage,
    PesquisarItemPage,
    InputFileComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MenuPageModule,
    IonicSelectableModule,
   // Angular2SignaturepadModule,
    BrMaskerModule,
    SearchSelectableModule,
    DataInputModule,
    CustomMenuModule,
    InputMbiModule,
    CalendarModule,
    ConfiguracaoCertificadoPageModule
],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //InAppBrowser,
    SplashScreen,
    StatusBar,
    AuthGuardService,
    AutentificacaoService,
    CurrencyPipe,
    FileOpener,
   // NativeStorage,
    File,
    MBIPipeModule,
    Base64,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
