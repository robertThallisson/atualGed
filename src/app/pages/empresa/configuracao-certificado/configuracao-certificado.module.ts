import { InputMbiModule } from './../../../components/input/input-mbi/input-mbi.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracaoCertificadoPageRoutingModule } from './configuracao-certificado-routing.module';

import { ConfiguracaoCertificadoPage } from './configuracao-certificado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracaoCertificadoPageRoutingModule,
    InputMbiModule
  ],
  declarations: [ConfiguracaoCertificadoPage]
})
export class ConfiguracaoCertificadoPageModule {}
