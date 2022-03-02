import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { ItemTipoInspecao } from '../../model/objetc/itemtipoinspecao';
import { TipoInspecao } from './../../model/objetc/tipoinspecao';

@Injectable({
  providedIn: 'root'
})
export class ItensTipoInspecaoService {

  private url: string = '/itenstipoinspecao';
  itenstipoinspecao: ItemTipoInspecao;

  
  constructor(private http: HttpClient , private as:AutentificacaoService) { }

  public bytipoinspecao(value : TipoInspecao) {
    return this.http.post(this.as.url + this.url + '/bytipoinspecao', value, this.as.getOptions());
  }

  public salvar(value : TipoInspecao) {
    return this.http.post(this.as.url + this.url , value, this.as.getOptions());
  }

  public salvarbytipoinspecao(value : TipoInspecao) {
    return this.http.post(this.as.url + this.url + '/salvarbytipoinspecao', value, this.as.getOptions());
  }
}
