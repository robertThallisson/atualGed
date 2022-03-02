import { Usuario } from './../../entity/Usuario';
import { Utils } from './../../entity/Utils';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string;
  public handleError: any;

  constructor(public http: HttpClient) {
    this.loginUrl = Utils.getUrlBackend() + "oauth/token?grant_type=password&username=";
  }

  public login(usuario: Usuario) {

    this.loginUrl + usuario.login + "&password=" + encodeURIComponent(usuario.senha);

    let headers = new HttpHeaders({
      "Authorization": "Basic " + btoa("angular" + ':' + "@ngul@r0")/*Senha aplicação */
    });

    let options = ({ headers: headers });

    return this.http.post(this.loginUrl + usuario.login + "&password=" +
    encodeURIComponent(usuario.senha), {}, options);

  }
}
