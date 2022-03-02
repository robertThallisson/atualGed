import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { StatusItemInspecao } from 'src/app/model/objetc/statusiteminspecao';
import { TipoStatusOJ } from '../../model/objetc/tipo-status-oj';
import { TipoStatus } from 'src/app/model/enums/tipo-status.enum';

@Injectable({
  providedIn: 'root'
})
export class StatusitensinspecaoService {

  private url: string = '/statusitensinspecao';
  status: StatusItemInspecao;

  constructor(private http: HttpClient , public as:AutentificacaoService) { }

  public salvar(status: StatusItemInspecao) {
    return this.http.post(this.as.url + this.url, status, this.as.getOptions());
  }

  public editar(status: StatusItemInspecao) {
    return this.http.put(this.as.url + this.url, status, this.as.getOptions());
  }

  public delete(status: StatusItemInspecao) {
    return this.http.post(this.as.url + this.url + '/deletar', status, this.as.getOptions());
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

  public edit(status: StatusItemInspecao) {
    return this.http.post(this.as.url + this.url + '/editar', status, this.as.getOptions());
  }

  public editarativo(status: StatusItemInspecao) {
    return this.http.post(this.as.url + this.url + '/editarativo', status, this.as.getOptions());
  }

  public getListStatus(): Array<TipoStatusOJ> {
    const lista: Array<TipoStatusOJ> =  new Array<TipoStatusOJ>();
    return lista;
  }
}
