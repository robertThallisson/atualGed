import { UsuarioService } from './../../../service/atualged/usuario.service';
import { Base } from "./../../../../app/model/base";
import { Usuario } from "./../../../model/objetc/usuario";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.page.html",
  styleUrls: ["./usuarios.page.scss"],
})
export class UsuariosPage implements OnInit {
  value: string = "";
  usuarios: Array<Usuario>;
  usuario: Usuario;

  constructor(
    private router: Router,
    private base: Base,
    public us: UsuarioService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
  }

  excluir(usuarios: any) {}

  inserir() {
    this.us.usuario = null;
    this.router.navigate(["usuario-inserir"]);
  }

  editar(usuario: Usuario) {
    this.us.usuario = usuario;
    this.router.navigate(["usuario-inserir"]);
  }

  permissaoUsuario(usuario: Usuario) {
    this.us.flag = "01";
    this.us.usuario = usuario;
    this.router.navigate(["permissao-usuario"]);
  }

  alteraSenha(usuario: Usuario) {
    this.base.atualizarSenha(usuario);
  }


  
  temRegistros(): boolean {
    try {
      return this.usuarios.length > 0;
    } catch (error) {
      return false;
    }
  }
}
