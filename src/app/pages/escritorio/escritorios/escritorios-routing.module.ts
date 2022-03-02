import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscritoriosPage } from './escritorios.page';

const routes: Routes = [
  {
    path: '',
    component: EscritoriosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscritoriosPageRoutingModule {}
