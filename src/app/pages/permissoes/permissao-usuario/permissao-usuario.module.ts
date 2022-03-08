import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissaoUsuarioPageRoutingModule } from './permissao-usuario-routing.module';

import { PermissaoUsuarioPage } from './permissao-usuario.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SearchSelectableModule } from '../../../components/search-selectable/search-selectable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    SearchSelectableModule,
    PermissaoUsuarioPageRoutingModule
  ],
  declarations: [PermissaoUsuarioPage]
})
export class PermissaoUsuarioPageModule {}
