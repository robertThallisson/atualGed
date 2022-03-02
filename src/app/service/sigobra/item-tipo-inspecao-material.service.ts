import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoInspecaoMaterial } from '../../model/objetc/tipo-inspecao-material';
import { ItemTipoInspecaoMaterial } from '../../model/objetc/item-tipo-inspecao-material';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class ItemTipoInspecaoMaterialService {
  private url: string = '/itemtipoinspecaomaterial';
  tipoinspecaomaterial: ItemTipoInspecaoMaterial;

  constructor(
    private http: HttpClient,
    public as: AutentificacaoService
  ) {

  }

  public pesquisarByTipoInspecaoMaterial(tipoinspecaomaterial: TipoInspecaoMaterial) {
    return this.http.post(this.as.url + this.url+ "/getbytipoinspecaomaterial", tipoinspecaomaterial, this.as.getOptions());
  }

}
