import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Fornecedor } from './../../model/objetc/fornecedor';
import { ServiceFilterBaseService } from '../filtroMenu/service-filter-base.service';
import { Clausula, GridMenu } from '../../model/objetc/filtro/clausula';

@Injectable({ 
  providedIn: 'root' 
})

export class FornecedorService extends ServiceFilterBaseService{ 
  private url: string = '/fornecedor'; 
  fornecedor: Fornecedor; 
 
  constructor(
    private http: HttpClient , 
    public as:AutentificacaoService
  ) { 
    super();
    this.montarClausulas();
  } 

  montarClausulas() {
    this.filtro.nativo = true;
    this.filtro.sql =
      'select ' +
      '  fon.* ' +
      // '  case when (valor_pago is not null) then (valor - valor_pago) else valor end as resto ' +
      'from fornecedor fon ' +
      ' where fon.id > 0 ';

    let gridMenu: GridMenu = new GridMenu();
    let clausula: Clausula = new Clausula();
    gridMenu.list = new Array<Clausula>();

    clausula = new Clausula();
    clausula.nome = 'fon.nome_fantasia';
    clausula.comparacao = 'contem';
    clausula.component = 'text';
    clausula.descricao = 'Nome ';
    clausula.name = 'data';
    gridMenu.list.push(clausula);

    clausula = new Clausula();
    clausula.nome = 'fon.cidade';
    clausula.comparacao = 'contem';
    clausula.component = 'text';
    clausula.descricao = 'Cidade';
    clausula.name = 'cidade';
    gridMenu.list.push(clausula);



    clausula = new Clausula();
    clausula.nome = 'fon.media';
    clausula.comparacao = '>=';
    clausula.component = 'number';
    clausula.descricao = 'Media';
    
    clausula.name = 'media';
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
 
  public salvar(fornecedor: Fornecedor) {
    return this.http.post(this.as.url + this.url, fornecedor, this.as.getOptions());
  }
 
  pesquisar(value: string) { 
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }
  pesquisarUltimosRegistros() {
    return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
  }
}
