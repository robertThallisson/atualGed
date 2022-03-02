import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Empresa } from './../../model/objetc/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url: string = '/empresas';
 // empresa: Empresa;
  logo: any;
  public emp:string;
  constructor(private http: HttpClient , private as:AutentificacaoService) { }

  public salvar(empresa: Empresa) {
    return this.http.post(this.as.url + this.url, empresa, this.as.getOptions());
  }




  pesquisar(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }



  public getImagem(id: number) {
    return this.http.get(this.as.url + this.url + '/imagemempresa/' + id.toString() , this.as.getOptions());
  }

}
