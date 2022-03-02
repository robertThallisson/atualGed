import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Produto } from './../../model/objetc/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private url: string = '/produto';
  produto: Produto;

  constructor(private http: HttpClient, public as: AutentificacaoService) {}

  public salvar(produto: Produto) {
    return this.http.post(
      this.as.url + this.url,
      produto,
      this.as.getOptions()
    );
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
