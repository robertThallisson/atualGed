import { CustomMenuModule } from './../../../components/custom-menu/custom-menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioPageRoutingModule } from './perfil-usuario-routing.module';

import { PerfilUsuarioPage } from './perfil-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomMenuModule,
    PerfilUsuarioPageRoutingModule
  ],
  declarations: [PerfilUsuarioPage]
})
export class PerfilUsuarioPageModule {}
