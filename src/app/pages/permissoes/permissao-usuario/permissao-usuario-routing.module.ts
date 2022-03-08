import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissaoUsuarioPage } from './permissao-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PermissaoUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissaoUsuarioPageRoutingModule {}
