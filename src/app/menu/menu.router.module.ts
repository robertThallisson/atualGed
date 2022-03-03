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
        pathMatch: "full"
      },
      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then(m => m.HomePageModule),
          canActivateChild: [AuthGuardService]
      },
      { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule) },
      {
        path: "menu/home",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: 'escritorios',
        loadChildren: () => import('./../pages/escritorio/escritorios/escritorios.module').then(m => m.EscritoriosPageModule),
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'escritorio-inserir',
        loadChildren: () => import('./../pages/escritorio/escritorio-inserir/escritorio-inserir.module').then(m => m.EscritorioInserirPageModule),
        canActivateChild: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPageRoutingModule { }
