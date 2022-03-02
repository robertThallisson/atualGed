import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesquisarItemPageRoutingModule } from './pesquisar-item-routing.module';

import { PesquisarItemPage } from './pesquisar-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisarItemPageRoutingModule
  ],
  declarations: [PesquisarItemPage]
})
export class PesquisarItemPageModule {}
