import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataModalPage } from './data-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DataModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataModalPageRoutingModule {}
