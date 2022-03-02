import { Marca } from './../../model/objetc/marca';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private url: string = '/marca';
  marca: Marca;

  constructor(
    private http: HttpClient,
    public as: AutentificacaoService
  ) {

  }

  public salvar(marca: Marca) {
    return this.http.post(this.as.url + this.url, marca, this.as.getOptions());
  }

  pesquisar(value: string) {
    return this.http.post(
      this.as.url + this.url + '/pesquisar',
      value,
      this.as.getOptions()
    );
  }
  pesquisarUltimosRegistros() {
    return this.http.get(
      this.as.url + this.url + '/pesquisarultimosregistro',
      this.as.getOptions()
    );
  }
}
