import { CustomMenuModule } from './../../../components/custom-menu/custom-menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscritoriosPageRoutingModule } from './escritorios-routing.module';

import { EscritoriosPage } from './escritorios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscritoriosPageRoutingModule,
    CustomMenuModule
  ],
  declarations: [EscritoriosPage]
})
export class EscritoriosPageModule {}
