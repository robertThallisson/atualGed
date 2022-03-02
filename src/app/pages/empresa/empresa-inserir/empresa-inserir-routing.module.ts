import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaInserirPage } from './empresa-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaInserirPageRoutingModule {}
