import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/autentificacao/auth-guard-service.service';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule) },
  {
    path: 'empresas',
    loadChildren: () => import('./pages/empresa/empresas/empresas.module').then( m => m.EmpresasPageModule)
  },
  {
    path: 'empresa-inserir',
    loadChildren: () => import('./pages/empresa/empresa-inserir/empresa-inserir.module').then( m => m.EmpresaInserirPageModule)
  },
  {
    path: 'empresas',
    loadChildren: () => import('./pages/empresa/empresas/empresas.module').then( m => m.EmpresasPageModule)
  },
  {
    path: 'empresa-inserir',
    loadChildren: () => import('./pages/empresa/empresa-inserir/empresa-inserir.module').then( m => m.EmpresaInserirPageModule)
  },
  {
    path: 'escritorios',
    loadChildren: () => import('./pages/escritorio/escritorios/escritorios.module').then( m => m.EscritoriosPageModule)
  },
  {
    path: 'escritorio-inserir',
    loadChildren: () => import('./pages/escritorio/escritorio-inserir/escritorio-inserir.module').then( m => m.EscritorioInserirPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
