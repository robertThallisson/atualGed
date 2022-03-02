import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { TipoInspecao } from './../../model/objetc/tipoinspecao';

@Injectable({
  providedIn: 'root'
})
export class TipoinspecaoService {
  private url: string = '/tipoinspecao';
  tipoinspecao: TipoInspecao;

  constructor(private http: HttpClient , public as:AutentificacaoService) { }

  public salvar(tipoinspecao: TipoInspecao) {
    return this.http.post(this.as.url + this.url, tipoinspecao, this.as.getOptions());
  }

  public editar(tipoinspecao: TipoInspecao) {
    return this.http.put(this.as.url + this.url, tipoinspecao, this.as.getOptions());
  }

  public delete(tipoinspecao: TipoInspecao) {
    return this.http.post(this.as.url + this.url + '/deletar', tipoinspecao, this.as.getOptions());
  }
  
  pesquisar(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }

  pesquisa(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisa', value, this.as.getOptions());
  }

  get(id: number) {
    return this.http.post(this.as.url + this.url, id, this.as.getOptions());    
  }

  public edit(tipoinspecao: TipoInspecao) {
    return this.http.post(this.as.url + this.url + '/editar', tipoinspecao, this.as.getOptions());
  }

  public editarativo(tipoinspecao: TipoInspecao) {
    return this.http.post(this.as.url + this.url + '/editarativo', tipoinspecao, this.as.getOptions());
  }

}
