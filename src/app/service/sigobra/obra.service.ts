import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Obras } from './../../model/objetc/obras';
import { Filtro } from '../../model/objetc/filtro/filtro';

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private url: string = '/obras';
  obra: Obras;

  constructor(private http: HttpClient , private as:AutentificacaoService) { }

  public salvar(obras: Obras) {
    return this.http.post(this.as.url + this.url, obras, this.as.getOptions());
  }

  public editar(obras: Obras) {
    return this.http.put(this.as.url + this.url, obras, this.as.getOptions());
  }

  public delete(obras: Obras) {
    return this.http.post(this.as.url + this.url + '/deletar', obras, this.as.getOptions());
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

  public edit(obras: Obras) {
    return this.http.post(this.as.url + this.url + '/editar', obras, this.as.getOptions());
  }

  public editarativo(obras: Obras) {
    return this.http.post(this.as.url + this.url + '/editarativo', obras, this.as.getOptions());
  }

  pesquisar1(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisar1', value, this.as.getOptions());
  }
  
  public findTop10ComInspencoesAbertas() {
    return this.http.get(this.as.url + this.url + '/ultimasobrasabertas', this.as.getOptions());
  }

  public filtra(filtro: Filtro) {
    return this.http.post(this.as.url + this.url + '/filtrar', filtro, this.as.getOptions());
  }

  // relatorio por filtro
  getRelatorioFiltro(filtro: Filtro) {
    return this.http.post(this.as.url + this.url + '/relatoriofiltro', filtro, this.as.getOptionsPDF());
  }

  // relatorio por obras
  getRelatorioObras(obras: Array<Obras>) {
    return this.http.post(this.as.url + this.url + '/relatorioobras', obras, this.as.getOptionsPDF());
  }
  // relatorio por obra
  getRelatorioObra(obra: Obras) {
    return this.http.post(this.as.url + this.url + '/relatorioobra', obra, this.as.getOptionsPDF());
  }

}
