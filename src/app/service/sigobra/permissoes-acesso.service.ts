
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilUsuario } from '../../model/objetc/perfil-usuario';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class PermissoesAcessoService {
  private url: string = '/permissao';
  public perfilUsuario: PerfilUsuario;

  constructor(private http: HttpClient,
    public as: AutentificacaoService) { }

  public pesquisarPermissoes(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisarpermissoes', value, this.as.getOptions());
  }

  /*   COLOCAR METODOS REFERENTES A PERFIL USUARIO DESTE PONTO PARA BAIXO     */

  public pesquisarPerfilUsuario(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisarperfilusuario', value, this.as.getOptions());
  }

  public pesquisarPerfilUsuario1(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisarperfilusuario1', value, this.as.getOptions());
  }

  public salvarPerfilUsuario(value: PerfilUsuario) {
    return this.http.post(this.as.url + this.url + '/salvarperfilusuario', value, this.as.getOptions());
  }

  public deletarPerfilUsuario(value: PerfilUsuario) {
    return this.http.post(this.as.url + this.url + '/excluirperfilusuario', value, this.as.getOptions());
  }
}
