import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracaoCertificadoPage } from './configuracao-certificado.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracaoCertificadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracaoCertificadoPageRoutingModule {}
