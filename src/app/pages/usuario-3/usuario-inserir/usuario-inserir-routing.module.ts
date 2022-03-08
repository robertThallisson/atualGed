import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioInserirPage } from './usuario-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioInserirPageRoutingModule {}
