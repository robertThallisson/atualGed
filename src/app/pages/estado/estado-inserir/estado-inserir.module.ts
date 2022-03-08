import { InputMbiModule } from './../../../components/input/input-mbi/input-mbi.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoInserirPageRoutingModule } from './estado-inserir-routing.module';

import { EstadoInserirPage } from './estado-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoInserirPageRoutingModule,
    InputMbiModule
    
  ],
  declarations: [EstadoInserirPage]
})
export class EstadoInserirPageModule {}
