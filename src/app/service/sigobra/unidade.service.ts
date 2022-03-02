import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Unidade } from './../../model/objetc/unidade'; 

@Injectable({ 
  providedIn: 'root' 
}) 

export class UnidadeService { 
  
  private url: string = '/unidade'; 
  unidade: Unidade; 
 
  constructor(private http: HttpClient , public as:AutentificacaoService) { } 
 
  public salvar(unidade: Unidade) {
    return this.http.post(this.as.url + this.url, unidade, this.as.getOptions());
  }
 
  pesquisar(value: string) { 
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }
  pesquisarUltimosRegistros() {
    return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
  }
}
