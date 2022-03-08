import { SearchSelectableModule } from './../../../components/search-selectable/search-selectable.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioInserirPageRoutingModule } from './usuario-inserir-routing.module';
import { UsuarioInserirPage } from './usuario-inserir.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrMaskerModule } from 'br-mask';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    BrMaskerModule,
    UsuarioInserirPageRoutingModule,
    SearchSelectableModule
  ],
  declarations: [UsuarioInserirPage],
  providers: [
    Camera
  ]
})
export class UsuarioInserirPageModule {}
