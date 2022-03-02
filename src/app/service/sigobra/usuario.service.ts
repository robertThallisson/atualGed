import { Usuario } from './../../model/objetc/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string ='/usuario';
  private imagem:string ='/imagemusuario';
  public usuario: Usuario;
  public usu: string;
  public idusu: number;  
  public usuar: string;
  public flag: string;
  constructor(private http: HttpClient , public as:AutentificacaoService) { }

  public salvar(usuario: Usuario) {
    return this.http.post(this.as.url + this.url, usuario, this.as.getOptions());
  }

  public salvarSoUsuario(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/alterarsenha', usuario, this.as.getOptions());
  }

  public getToken(usuario: Usuario) {
    return this.http.post(this.as.url + this.as.urlToken, this.as.getBodyToken(usuario.email, usuario.senha), this.as.getOptionsToken());
  }

  public logar(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/logar', usuario, this.as.getOptions());
  }
  public getImagem(id: number) {
    return this.http.get(this.as.url + this.url + this.imagem + '/' + id.toString() , this.as.getOptions());
  }

  public pesquisar(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }

  public pesquisa(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisa', value, this.as.getOptions());
  }

  public confirmaSenha(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/confirmasenha' , usuario, this.as.getOptions());
  }

  public esqueceuSenha(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/esqueceusenha' , usuario, this.as.getOptions());
  }
  public byusuario(value: string) {
    return this.http.post(this.as.url + this.url + '/byusuario', value, this.as.getOptions());
  }
}
