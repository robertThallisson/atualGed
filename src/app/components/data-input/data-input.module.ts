import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataInputComponent } from './data-input.component';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule
  ],
  declarations: [
    DataInputComponent
  ],
  exports: [
    DataInputComponent
  ]
})
export class DataInputModule { }
