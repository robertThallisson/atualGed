import { Certificado } from './../../model/objetc/certificado';
import { AutentificacaoService } from './../autentificacao/autentificacao.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoCertificadoService {

  private url: string = '/certificado';
  constructor(private http: HttpClient, public as: AutentificacaoService) { }

  public salvar(value: Certificado) {
    return this.http.post(this.as.url + this.url , value, this.as.getOptions());
  }
  
}
