import { ProdutoService } from './produto.service';
import { TipoInspecaoMaterialService } from './tipo-inspecao-material.service';
import { TipoInspecaoMaterial } from './../../model/objetc/tipo-inspecao-material';
import { InspecaoMaterial } from './../../model/objetc/inspecao-material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { FornecedorService } from './fornecedor.service';
import { ServiceFilterBaseService } from '../filtroMenu/service-filter-base.service';
import { Clausula, GridMenu } from '../../model/objetc/filtro/clausula';
@Injectable({
  providedIn: 'root'
})
export class InspecaoMaterialService  extends ServiceFilterBaseService {
  private url: string = '/inspecaomaterial';
  inspecaomaterial: InspecaoMaterial;

  constructor(
    private http: HttpClient, 
    public as: AutentificacaoService,
    private tipoInspecaoMaterialService: TipoInspecaoMaterialService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService
  ) { 
    super();
    this.montarClausulas();
  }

  montarClausulas() {
    this.filtro.nativo = true;
    this.filtro.sql =
      'select ' +
      '  inm.* ' +
      // '  case when (valor_pago is not null) then (valor - valor_pago) else valor end as resto ' +
      'from inspecao_material inm ' +
      ' where inm.id > 0 ';

    let gridMenu: GridMenu = new GridMenu();
    let clausula: Clausula = new Clausula();
    gridMenu.list = new Array<Clausula>();

    clausula = new Clausula();
    clausula.nome = 'inm.nota_fiscal';
    clausula.comparacao = 'like';
    clausula.component = 'text';
    clausula.descricao = 'Nota Fiscal ';
    clausula.name = 'data';
    gridMenu.list.push(clausula);

    clausula = new Clausula();
    clausula.nome = 'inm.numero_pedido';
    clausula.comparacao = 'like';
    clausula.component = 'text';
    clausula.descricao = 'Numero Pedido';
    clausula.name = 'cidade';
    gridMenu.list.push(clausula);



    clausula = new Clausula();
    clausula.nome = 'inm.nota';
    clausula.comparacao = '>=';
    clausula.component = 'number';
    clausula.descricao = 'Nota';
    
    clausula.name = 'media';
    gridMenu.list.push(clausula);


    this.clausulas.push(gridMenu);

    gridMenu = new GridMenu();

    clausula = new Clausula();
    clausula.nome = 'inm.data_inspecao';
    clausula.comparacao = 'between';
    clausula.component = 'between_date';
    clausula.descricao = 'Data Inspecão ';
    clausula.name = 'data';
    clausula.name2 = 'data2';
    clausula.addHora = true;
    gridMenu.list.push(clausula);


    clausula = new Clausula();
    clausula.nome = 'inm.fornecedor_id';
    clausula.comparacao = '=';
    clausula.fieldValue = 'id';
    clausula.component = 'selected';
    clausula.descricao = 'Fornecedor';
    clausula.service = this.fornecedorService;
    clausula.name = 'Fornecedor';
    gridMenu.list.push(clausula);
    this.clausulas.push(gridMenu);

    gridMenu = new GridMenu();

    clausula = new Clausula();
    clausula.nome = 'inm.tipo_inspecao_material_id';
    clausula.comparacao = '=';
    clausula.fieldValue = 'id';
    clausula.component = 'selected';
    clausula.descricao = 'Tipo Inspecão';
    clausula.service = this.tipoInspecaoMaterialService;
    clausula.name = 'tipoInspecao';
    gridMenu.list.push(clausula);

    clausula = new Clausula();
    clausula.nome = 'inm.produto_id';
    clausula.comparacao = '=';
    clausula.fieldValue = 'id';
    clausula.component = 'selected';
    clausula.descricao = 'Produto';
    clausula.service = this.produtoService;
    clausula.name = 'produto';
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

  public salvar(inspecaomaterial: InspecaoMaterial) {
    return this.http.post(this.as.url + this.url, inspecaomaterial, this.as.getOptions());
  }

  pesquisar(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }
  pesquisarUltimosRegistros() {
    return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
  }
}
