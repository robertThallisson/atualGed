import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioInserirPageRoutingModule } from './perfil-usuario-inserir-routing.module';

import { PerfilUsuarioInserirPage } from './perfil-usuario-inserir.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SearchSelectableModule } from '../../../components/search-selectable/search-selectable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    SearchSelectableModule,
    PerfilUsuarioInserirPageRoutingModule
  ],
  declarations: [PerfilUsuarioInserirPage]
})
export class PerfilUsuarioInserirPageModule {}
