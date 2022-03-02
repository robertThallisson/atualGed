import { NotificationsComponent } from "./../components/notifications/notifications.component";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AutentificacaoService } from '../service/autentificacao/autentificacao.service';
import { EmpresaService } from '../service/sigobra/empresa.service';
import { Base } from '../model/base';


@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {

  emp: string;
  logo: any;

  constructor(private router: Router, private as: AutentificacaoService, private es: EmpresaService, public base: Base) {

  }

  ngOnInit() {
    try {
      if (this.as.token.empresa.pessoaJuridica.razaoSocial === "") {
        this.emp = "Mundobit Informática"
      } else {
        this.emp = this.as.token.empresa.pessoaJuridica.razaoSocial;
        this.logo = this.as.token.empresa.pessoaJuridica.razaoSocial;
      }

      if (this.as.deveAtualizarSenha) {
        this.base.atualizarSenha(this.as.token.usuario);
      }
    } catch (error) {
      this.emp = "Mundobit Informática"
    }
  }

  getImagemLogo() {
    try {
      //return this.base.getImagem(this.as.token.empresa.logo);
    } catch (error) {
      return '';
    }

  }

  gotoContabilidade() {
    this.router.navigate(['escritorios']);
  }

  gotoTipoinspecoes() {
    this.router.navigate(['tipoinspecoes']);
  }

  gotoStatus() {
    this.router.navigate(['statusitensinspecoes']);
  }

  gotoInspecoes() {
    this.router.navigate(['inspecoes']);
  }

  gotoClientes() {
    this.router.navigate(['clientes']);
  }

  gotoUsuarios() {
    this.router.navigate(['usuarios']);
  }

  gotoEmpresas() {
    this.router.navigate(['empresas']);
  }

  gotoAnamneses() {
    this.router.navigate(['anamneses']);
  }

  gotoTarefas() {
    this.router.navigate(['tarefas']);
  }


  gotoFornecedores() {
    this.router.navigate(['fornecedores']);
  }

  gotoProdutos() {
    this.router.navigate(['produtos']);
  }

  gotoTipoInspecoesMaterial() {
    this.router.navigate(['tipo-inspecao-materiais']);
  }

  gotoInspecaoMaterial() {
    this.router.navigate(['inspecoes-material']);
  }

  permissoes() {
    this.router.navigate(["perfil-usuario"]);
  }



  logout() {
    this.as.logout();
    this.router.navigate(["login"]);
  }

}
