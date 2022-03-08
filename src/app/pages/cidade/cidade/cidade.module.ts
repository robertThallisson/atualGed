import { CustomMenuModule } from './../../../components/custom-menu/custom-menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CidadePageRoutingModule } from './cidade-routing.module';

import { CidadePage } from './cidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CidadePageRoutingModule,
    CustomMenuModule
  ],
  declarations: [CidadePage]
})
export class CidadePageModule {}
