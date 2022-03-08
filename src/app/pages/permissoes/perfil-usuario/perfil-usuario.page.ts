import { Component, OnInit } from '@angular/core';
import { PerfilUsuario } from '../../../model/objetc/perfil-usuario';
import { PermissoesAcessoService } from '../../../service/anamnese/permissoes-acesso.service';
import { Base } from '../../../model/base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  perfisUsuarios: Array<PerfilUsuario>;
  value: string = ' ';
  constructor(public pa: PermissoesAcessoService,
    public base: Base, private router: Router) {

  }

  ngOnInit() {

  }
  inserir() {
    this.pa.perfilUsuario = null;
    this.router.navigate(['menu/perfil-usuario-inserir']);
  }

  permissaoUsuario() {
    this.router.navigate(['menu/permissao-usuario']);
  }

  editar(perfilUsuario: PerfilUsuario) {
    this.pa.perfilUsuario = perfilUsuario;
    this.router.navigate(['menu/perfil-usuario-inserir']);
  }

  pesquisarPerfilUsuario(value: string) {
    this.base.present();
    this.pa.pesquisar(value).subscribe(
      data => {
        this.perfisUsuarios = data as Array<PerfilUsuario>;
        this.base.dismiss();
      },
      error => {
        this.base.mensagemErro('Falha ao consultar perfil usuário ' + this.base.tratarErro(error));
        this.base.dismiss();
      }
    );
  }

  deletar(perfilUsuario: PerfilUsuario) {
    this.base.present();
    this.pa.deletarPerfilUsuario(perfilUsuario).subscribe(
      data => {
        this.base.dismiss();
        data = [];
      },
      error => {
        this.base.mensagemErro('Falha ao excluir perfil usuário ' + this.base.tratarErro(error));
        this.base.dismiss();
      }
    );
  }


  temRegistros(): boolean {
    try {
      return this.perfisUsuarios.length > 0;
    } catch (error) {
      return false;
    }
  }

}
