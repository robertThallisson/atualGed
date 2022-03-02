import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSelectableComponent } from './search-selectable.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [
    SearchSelectableComponent
  ],
  exports: [
    SearchSelectableComponent
  ]
})
export class SearchSelectableModule { }
