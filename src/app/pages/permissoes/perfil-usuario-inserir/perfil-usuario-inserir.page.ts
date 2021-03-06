import { Component, OnInit } from '@angular/core';
import { Base } from '../../../model/base';
import { Permissao } from '../../../model/objetc/permissao';
import { PerfilUsuario } from '../../../model/objetc/perfil-usuario';
import { Router } from '@angular/router';
import { PermissoesAcessoService } from '../../../service/atualged/permissoes-acesso.service';
@Component({
  selector: 'app-perfil-usuario-inserir',
  templateUrl: './perfil-usuario-inserir.page.html',
  styleUrls: ['./perfil-usuario-inserir.page.scss'],
})
export class PerfilUsuarioInserirPage implements OnInit {

  permissoes: Array<Permissao>;
  perfilUsuario: PerfilUsuario = new PerfilUsuario();
  constructor(public pa: PermissoesAcessoService ,
    private base: Base,
    private router: Router) {
      if (this.pa.perfilUsuario !== undefined && this.pa.perfilUsuario !== null) {
        this.perfilUsuario = this.pa.perfilUsuario;
      } else {
      }
    }
  ngOnInit(): void {
 
  }


  salvar() {
    this.base.present();
    this.perfilUsuario.escritorio  = this.pa.as.token.escritorio;
    this.pa.salvarPerfilUsuario(this.perfilUsuario).subscribe(
      data => {
        this.base.dismiss();
        this.pa.perfilUsuario = new PerfilUsuario();
        this.router.navigate(['menu/perfil-usuario']);
      },
      error => {
        this.base.dismiss();
        this.base.mensagemErro('Falha ao salvar perfil de usuário ' +  this.base.tratarErro(error));
      }
    );
  }

}
