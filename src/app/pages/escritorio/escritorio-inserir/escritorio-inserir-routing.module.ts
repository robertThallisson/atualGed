import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscritorioInserirPage } from './escritorio-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: EscritorioInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscritorioInserirPageRoutingModule {}
