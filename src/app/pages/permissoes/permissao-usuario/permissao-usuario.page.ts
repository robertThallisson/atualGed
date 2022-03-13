import { PerfilUsuario } from './../../../model/objetc/perfil-usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../model/objetc/usuario';
import { Base } from '../../../model/base';
import { UsuarioService } from '../../../service/atualged/usuario.service';
import { PermissoesAcessoService } from '../../../service/atualged/permissoes-acesso.service';

@Component({
  selector: 'app-permissao-usuario',
  templateUrl: './permissao-usuario.page.html',
  styleUrls: ['./permissao-usuario.page.scss'],
})
export class PermissaoUsuarioPage implements OnInit {
  usuario: Usuario = new Usuario();
  perfisUsuarios: Array<PerfilUsuario>;
  usuarios: Array<Usuario>;
  constructor(
    private router: Router,
    private base: Base,
    public us: UsuarioService,
    public pa: PermissoesAcessoService
  ) {
  }

  ngOnInit() {
    if (this.us.flag === '01') {
      this.usuario = this.us.usuario;
      this.us.flag = '00';
    }
  }

  onClean(event: any) {
    this.usuario = new Usuario();
  }

  salvar() {
    this.base.present();
    this.us.salvar(this.usuario).subscribe(
      (data) => {
        this.base.dismiss();
        this.router.navigate(['menu/perfil-usuario']);
      },
      (error) => {
        this.base.dismiss();
      }
    );
  }
}
