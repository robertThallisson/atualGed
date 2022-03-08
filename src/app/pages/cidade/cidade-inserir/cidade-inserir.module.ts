import { SearchSelectableModule } from './../../../components/search-selectable/search-selectable.module';
import { InputMbiModule } from './../../../components/input/input-mbi/input-mbi.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CidadeInserirPageRoutingModule } from './cidade-inserir-routing.module';

import { CidadeInserirPage } from './cidade-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CidadeInserirPageRoutingModule,
    InputMbiModule,
    SearchSelectableModule
  ],
  declarations: [CidadeInserirPage]
})
export class CidadeInserirPageModule {}
