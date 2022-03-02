import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemInspecaoMaterial } from '../../model/objetc/item-inspecao-material';
import { InspecaoMaterial } from '../../model/objetc/inspecao-material';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class ItemInspecaoMaterialService {

  private url: string = '/iteminspecaomaterial';
  tipoinspecaomaterial: ItemInspecaoMaterial;

  constructor(
    private http: HttpClient,
    public as: AutentificacaoService
  ) {

  }

  public pesquisarByTipoInspecaoMaterial(tipoinspecaomaterial: InspecaoMaterial) {
    return this.http.post(this.as.url + this.url+ "/getbyinspecaomaterial", tipoinspecaomaterial, this.as.getOptions());
  }
}
