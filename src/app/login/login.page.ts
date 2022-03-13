import { Usuario } from './../model/objetc/usuario';
import { Token } from './../model/seguranca/token';

import { Component, OnInit } from '@angular/core';
import { AutentificacaoService } from '../service/autentificacao/autentificacao.service';
import { Router } from '@angular/router';
import { Base } from '../model/base';
import { UsuarioService } from '../service/atualged/usuario.service';
//import { Empresa } from '../model/objetc/empresa';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private as: AutentificacaoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private base: Base
  ) {

  }

  usuario: Usuario = new Usuario();

  btn: boolean = false;
  submitted = false;
  urlBase = '';
  ngOnInit() {

    if (!this.base.isNullOrWhiteSpace(localStorage.getItem('urlBase'))) {
      this.urlBase = localStorage.getItem('urlBase');
    } else {
      this.urlBase = this.as.url;
    }
    
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.logar();
    }
  }

  logar() {
    let teste = this.base.present();
    console.log(teste);
    this.as.url = this.urlBase;
    const senhaDigita = this.usuario.senha;
    this.usuarioService.getToken(this.usuario).subscribe(
      data => {
        this.base.dismiss();
        localStorage.setItem('urlBase', this.urlBase);
        this.as.token = data as Token;
        this.router.navigate(['menu']);
        if (senhaDigita === 'abc123') {
          this.as.deveAtualizarSenha = true;
        }
        this.usuario = new Usuario();
      }, error => {
        this.base.dismiss();
        this.base.mensagemErro('Falha ao acessar :\n' + this.base.tratarErro(error));
      }
    );
  }

  esqueceuSenha() {
    this.base.esqueceuSenha();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  aberto() {
    this.btn = !this.btn;
  }

}
