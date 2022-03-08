import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadeInserirPage } from './cidade-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: CidadeInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadeInserirPageRoutingModule {}
