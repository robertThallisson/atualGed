import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoInserirPage } from './estado-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoInserirPageRoutingModule {}
