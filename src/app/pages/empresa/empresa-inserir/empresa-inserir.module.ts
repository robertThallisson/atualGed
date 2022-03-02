import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaInserirPageRoutingModule } from './empresa-inserir-routing.module';

import { EmpresaInserirPage } from './empresa-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaInserirPageRoutingModule
  ],
  declarations: [EmpresaInserirPage]
})
export class EmpresaInserirPageModule {}
