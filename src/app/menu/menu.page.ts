import { Usuario } from './../model/objetc/usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/sigobra/usuario.service';
import { Router } from '@angular/router';
import { Base } from '../model/base';
import { AutentificacaoService } from '../service/autentificacao/autentificacao.service';
import { EmpresaService } from '../service/sigobra/empresa.service';
//import { Empresa } from '../model/objetc/empresa';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(
    private us: UsuarioService,
    private base: Base,
    private as: AutentificacaoService,
    private router: Router,
    private es: EmpresaService,
    private menu: MenuController
  ) {

  }

  play() {
    console.log('clicked');
  }
  usuario: Usuario = new Usuario();
  emp: string;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      src: 'home'
    },
    {
      title: 'Cadastros',
      icon: 'settings-outline',
      open: false,
      children: [
        {
          title: 'Escritorios',
          icon: 'construct',
          url: '/escritorios',
        },
        {
          title: 'Status Itens',
          icon: 'attach',
          url: '/statusitensinspecoes',
        },
        {
          title: 'Unidade',
          icon: 'clipboard',
          url: '/unidades',
        },
        {
          title: 'Marca',
          icon: 'briefcase',
          url: '/marcas',
        },
        {
          title: 'Produtos',
          icon: 'cart-outline',
          url: '/produtos',
        },
        {
          title: 'Fonecedores',
          icon: 'boat',
          url: '/fornecedores',
        },
        {
          title: 'Usuário',
          icon: 'person-add',
          url: '/usuarios',
        },
        {
          title: 'Empresa',
          icon: 'business',
          url: '/empresas',
        },
      ]
    },

    {
      title: 'Inspecoes',
      icon: 'checkbox',
      open: false,
      children: [
        {
          title: 'Tipos de Inspeções serviços',
          icon: 'checkbox',
          url: '/tipoinspecoes',
        },

        {
          title: 'Inspeção serviço',
          icon: 'clipboard',
          url: '/inspecoes',
        },

        {
          title: 'Tipo  Inspeção material',
          icon: 'clipboard',
          url: '/tipo-inspecao-materiais',
        },
        {
          title: 'Inspeção material',
          icon: 'clipboard',
          url: '/inspecoes-material',
        },

      ]
    }
    ,

    {
      title: 'Segurança',
      icon: 'key-outline',
      url: '/perfil-usuario',
    },
    {
      title: 'relatórios ',
      icon: 'newspaper-outline',

      open: false,
      children: [
        {
          title: 'Tarefas',
          icon: 'pulse',
          url: '/tarefas',
        },
        {
          title: 'Geral inpeção',
          icon: 'clipboard',
          url: '/selecao-relatorio',
          visivel: true
        },
        {
          title: 'Inspeção',
          icon: 'clipboard',
          url: '/relatorio-inspecao',
          visivel: true
        }
      ]
    }
  ];

  ngOnInit() {

    this.menu.enable(true, 'first');
    this.menu.open('first');
    try {
      if (this.as.token.nome !== "admin") {
        this.usuario.login = this.as.token.usuario.login;
      } else {
        this.usuario.login = "Administrador"
      }

      if (this.as.token.empresa !== null && this.as.token.empresa !== undefined) {
        this.es.getImagem(this.as.token.empresa.id).subscribe(
          data => {
            try {
              ///this.as.token.empresa.logo = (data as Empresa).logo;
            } catch (erro) {

            }
          }
        );
      }

      if (this.as.token.usuario !== null && this.as.token.usuario !== undefined) {
        this.us.getImagem(this.as.token.usuario.id).subscribe(

          data => {
            try {
              //this.as.token.usuario.pessoa.foto = (data as Usuario).pessoa.foto;
            } catch (erro) {

            }
          }
        );
      }
      //   this.router.navigate(['home']);
    } catch (error) {

    }

  }
  navegar() {
  }
  getImagemPerfil() {
    try {
      if (
        this.as.token != null &&
        this.as.token.usuario != null &&
        this.as.token.usuario.pessoaJuridica.foto != null
      ) {
        return "data:image/jpeg;base64," + this.as.token.usuario.pessoaJuridica.foto;
      } else {
        return "/assets/img/boy-512.png";
      }
    } catch (error) {
      return "/assets/img/boy-512.png";
    }
  }

  alteraSenha() {
    this.base.atualizarSenha(this.as.token.usuario);
  }

  logout() {
    this.as.logout();
    this.router.navigate(["login"]);
  }


}
