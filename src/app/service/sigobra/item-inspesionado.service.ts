import { AutentificacaoService } from './../autentificacao/autentificacao.service';
import { Injectable } from '@angular/core';
import { ItemInspecao } from '../../model/objetc/inspecaoitemtipoinspecao';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemInspesionadoService {
  private url: string = '/iteminspecionado';
  item: ItemInspecao;
  constructor(private http: HttpClient , private as:AutentificacaoService) { }

  public salvar(item: ItemInspecao, idInspecao: Number) {
    return this.http.post(this.as.url + this.url + '/' + idInspecao.toString(), item, this.as.getOptions());
  }


  public salvarFotos(item: ItemInspecao) {
    return this.http.post(this.as.url + this.url + '/salvarfotos', item, this.as.getOptions());
  }
  pesquisarUltimosItens() {
    return this.http.get(this.as.url + this.url + '/pesquisarultimositens', this.as.getOptions());
  }
}
