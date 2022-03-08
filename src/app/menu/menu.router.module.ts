import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../service/autentificacao/auth-guard-service.service";
import { MenuPage } from "./menu.page";

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then((m) => m.HomePageModule),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "login",
        loadChildren: () =>
          import("../login/login.module").then((m) => m.LoginPageModule),
      },
      {
        path: "menu/home",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "escritorios",
        loadChildren: () =>
          import("./../pages/escritorio/escritorios/escritorios.module").then(
            (m) => m.EscritoriosPageModule
          ),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "escritorio-inserir",
        loadChildren: () =>
          import(
            "./../pages/escritorio/escritorio-inserir/escritorio-inserir.module"
          ).then((m) => m.EscritorioInserirPageModule),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "empresas",
        loadChildren: () =>
          import("./../pages/empresa/empresas/empresas.module").then(
            (m) => m.EmpresasPageModule
          ),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "empresa-inserir",
        loadChildren: () =>
          import(
            "./../pages/empresa/empresa-inserir/empresa-inserir.module"
          ).then((m) => m.EmpresaInserirPageModule),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "estados",
        loadChildren: () =>
          import("./../pages/estado/estados/estados.module").then(
            (m) => m.EstadosPageModule
          ),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "estado-inserir",
        loadChildren: () =>
          import("./../pages/estado/estado-inserir/estado-inserir.module").then(
            (m) => m.EstadoInserirPageModule
          ),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "cidade",
        loadChildren: () =>
          import("./../pages/cidade/cidade/cidade.module").then(
            (m) => m.CidadePageModule
          ),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "cidade-inserir",
        loadChildren: () =>
          import("./../pages/cidade/cidade-inserir/cidade-inserir.module").then(
            (m) => m.CidadeInserirPageModule
          ),
        canActivateChild: [AuthGuardService],
      },
      {
        path: "usuarios",
        loadChildren: () =>
          import("./../pages/usuario/usuarios/usuarios.module").then(
            (m) => m.UsuariosPageModule
          ),
          canActivateChild: [AuthGuardService],
      },
      {
        path: "usuario-inserir",
        loadChildren: () =>
          import(
            "./../pages/usuario/usuario-inserir/usuario-inserir.module"
          ).then((m) => m.UsuarioInserirPageModule),
          canActivateChild: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
