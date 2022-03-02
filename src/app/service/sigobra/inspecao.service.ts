import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Inspecao } from './../../model/objetc/inspecao';
import { ItemInspecao } from '../../model/objetc/inspecaoitemtipoinspecao';
import { Filtro } from './../../model/objetc/filtro/filtro';
import { ServiceFilterBaseService } from '../filtroMenu/service-filter-base.service';
import { Clausula, GridMenu } from './../../model/objetc/filtro/clausula';
import { ObraService } from './obra.service';
@Injectable({
  providedIn: 'root'
})
export class InspecaoService extends ServiceFilterBaseService {
  private url: string = '/inspecao';
  inspecao: Inspecao;

  constructor(
    private http: HttpClient,
    private as: AutentificacaoService,
    private os: ObraService
  ) {
    super();
    this.montarClausulas();
  }

  montarClausulas() {
    this.filtro.nativo = true;
    this.filtro.sql =
      'select ' +
      '  ins.* ' +
      // '  case when (valor_pago is not null) then (valor - valor_pago) else valor end as resto ' +
      'from inspecao ins ' +
      ' where ins.id > 0 ';

    let gridMenu: GridMenu = new GridMenu();
    let clausula: Clausula = new Clausula();
    gridMenu.list = new Array<Clausula>();

    clausula = new Clausula();
    clausula.nome = 'ins.dtinicio';
    clausula.comparacao = 'between';
    clausula.component = 'between_date';
    clausula.descricao = 'Data Abertura ';
    clausula.name = 'data';
    clausula.name2 = 'data2';
    gridMenu.list.push(clausula);

    clausula = new Clausula();
    clausula.nome = 'ins.dtfinalizada';
    clausula.comparacao = 'between';
    clausula.component = 'between_date';
    clausula.descricao = 'Data Fechament';
    clausula.name = 'data_vencimento';
    clausula.name2 = 'data_vencimento2';
    gridMenu.list.push(clausula);

    this.clausulas.push(gridMenu);

    gridMenu = new GridMenu();

    clausula = new Clausula();
    clausula.nome = 'ins.obras_id';
    clausula.comparacao = '=';
    clausula.fieldValue = 'id';
    clausula.component = 'selected';
    clausula.descricao = 'Obra';
    clausula.service = this.os;
    clausula.name = 'obra';
    gridMenu.list.push(clausula);


    clausula = new Clausula();
    clausula.nome = 'ins.dtfinalizada';
    clausula.comparacao = ' is ';
    clausula.component = 'check';
    clausula.descricao = 'Finalizadas';
    clausula.service = this.os;
    clausula.name = 'dtfinalizada';
    clausula.isNullCompare = true;
    gridMenu.list.push(clausula);


    this.clausulas.push(gridMenu);
  }

  filtrar() {
    return this.http.post(
      this.as.url + this.url + '/filtrar',
      this.filtro,
      this.as.getOptions()
    );
  }


  public salvar(inspecao: Inspecao) {
    return this.http.post(this.as.url + this.url, inspecao, this.as.getOptions());
  }

  public editar(inspecao: Inspecao) {
    return this.http.put(this.as.url + this.url, inspecao, this.as.getOptions());
  }

  public delete(inspecao: Inspecao) {
    return this.http.post(this.as.url + this.url + '/deletar', inspecao, this.as.getOptions());
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

  public edit(inspecao: Inspecao) {
    return this.http.post(this.as.url + this.url + '/editar', inspecao, this.as.getOptions());
  }

  public editarativo(inspecao: Inspecao) {
    return this.http.post(this.as.url + this.url + '/editarativo', inspecao, this.as.getOptions());
  }

  byinspecaoitens(inspecao: Inspecao) {
    return this.http.post(this.as.url + this.url + '/byinspecaoitens', inspecao, this.as.getOptions());
  }

  aprova(inspecaoitem: ItemInspecao) {
    return this.http.post(this.as.url + this.url + '/aprova', inspecaoitem, this.as.getOptions());
  }

  reprova(inspecaoitem: ItemInspecao) {
    return this.http.post(this.as.url + this.url + '/reprova', inspecaoitem, this.as.getOptions());
  }

  raprova(inspecaoitem: ItemInspecao) {
    return this.http.post(this.as.url + this.url + '/raprova', inspecaoitem, this.as.getOptions());
  }



  public filtra(filtro: Filtro) {
    return this.http.post(this.as.url + this.url + '/filtrar', filtro, this.as.getOptions());
  }

  public pesquisarUltimosItens() {
    return this.http.get(this.as.url + this.url + '/listarultimas', this.as.getOptions());
  }

  getRelatorioFiltroObra(filtro: Filtro) {
    return this.http.post(this.as.url + this.url + '/getrelatoriofiltroobra', filtro, this.as.getOptionsPDF());
  }

  getRelatorioFiltroObraConsolidado(filtro: Filtro) {
    return this.http.post(this.as.url + this.url + '/getrelatoriofiltroobraconsolidado', filtro, this.as.getOptionsPDF());
  }

  getRelatorioFiltro(filtro: Filtro) {
    return this.http.post(this.as.url + this.url + '/getrelatoriofiltro', filtro, this.as.getOptionsPDF());
  }


  getRelatorioInspecao(inspecao: Inspecao) {
    return this.http.post(this.as.url + this.url + '/relatoriodeinpecao', inspecao, this.as.getOptionsPDF());
  }

}
