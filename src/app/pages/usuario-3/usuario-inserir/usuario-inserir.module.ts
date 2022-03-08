import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioInserirPageRoutingModule } from './usuario-inserir-routing.module';

import { UsuarioInserirPage } from './usuario-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioInserirPageRoutingModule
  ],
  declarations: [UsuarioInserirPage]
})
export class UsuarioInserirPageModule {}
