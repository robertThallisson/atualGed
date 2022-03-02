import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomListModalPageRoutingModule } from './custom-list-modal-routing.module';

import { CustomListModalPage } from './custom-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomListModalPageRoutingModule
  ],
  declarations: [CustomListModalPage]
})
export class CustomListModalPageModule {}
