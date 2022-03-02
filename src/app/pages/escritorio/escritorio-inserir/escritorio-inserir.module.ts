import { DataInputModule } from './../../../components/data-input/data-input.module';
import { InputMbiModule } from './../../../components/input/input-mbi/input-mbi.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscritorioInserirPageRoutingModule } from './escritorio-inserir-routing.module';

import { EscritorioInserirPage } from './escritorio-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscritorioInserirPageRoutingModule,
    InputMbiModule,
    DataInputModule,
  ],
  declarations: [EscritorioInserirPage]
})
export class EscritorioInserirPageModule {}
