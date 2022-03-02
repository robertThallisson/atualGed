import { GridMenu, Clausula } from './../../model/objetc/filtro/clausula';
import { HttpClient } from '@angular/common/http';
import { LocalObra } from './../../model/objetc/local-obra';
import { Injectable } from '@angular/core';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { ServiceFilterBaseService } from '../filtroMenu/service-filter-base.service';

@Injectable({
  providedIn: 'root'
})
export class LocalObraService extends ServiceFilterBaseService {

  private url: string = '/iteminspecaomaterial';
  localobra: LocalObra;

  constructor(
    private http: HttpClient,
    public as: AutentificacaoService
  ) {
    super();
    this.montarClausulas();
  }


  montarClausulas() {
    this.filtro.nativo = true;
    this.filtro.sql =
      'select ' +
      '  loo.* ' +
      // '  case when (valor_pago is not null) then (valor - valor_pago) else valor end as resto ' +
      'from local_obra loo ' +
      ' where loo.id > 0 ';

    let gridMenu: GridMenu = new GridMenu();
    let clausula: Clausula  = new Clausula();
    gridMenu.list = new Array<Clausula>();

    clausula = new Clausula();
    clausula.nome = 'loo.obras_id';
    clausula.comparacao = '=';
    clausula.component = 'selected';
    clausula.descricao = 'Obra ';
    clausula.name = 'obras';
    gridMenu.list.push(clausula);

  
    this.clausulas.push(gridMenu);


  }
  
  public pesquisarByTipoInspecaoMaterial(localobra: LocalObra) {
    return this.http.post(this.as.url + this.url+ "/getbyinspecaomaterial", localobra, this.as.getOptions());
  }


  filtrar() {
    return this.http.post(
      this.as.url + this.url + '/filtrar',
      this.filtro,
      this.as.getOptions()
    );
  }

  public salvar(value: LocalObra) {
    return this.http.post(this.as.url + this.url, value, this.as.getOptions());
  }

  pesquisar(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }
  pesquisarUltimosRegistros() {
    return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
  }
}
