import { Pesquisa } from './../../model/objetc/filtro/pesquisa';
import { GridMenu } from './../../model/objetc/filtro/clausula';
import { Filtro } from './../../model/objetc/filtro/filtro';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceFilterBaseService {

  filtro: Filtro = new Filtro();

  public clausulas: Array<GridMenu> = new Array<GridMenu>();
  constructor() {

  }

  montarFiltro() {
    this.filtro.pesquisas = new Array<Pesquisa>();
    this.clausulas.forEach(
      (element) => {
        element.list.forEach(value => {
          if ((value.value === null || value.value === undefined || value.value === '') && (value.value2 === null || value.value2 === undefined|| value.value2 === '')) {
            return;
          }
          const pesquisa: Pesquisa = new Pesquisa();
          pesquisa.nome = value.nome;
          if (value.component === 'between_date') {
            if ((value.value !== null && value.value !== undefined) && (value.value2 !== null && value.value2 !== undefined)) {
              pesquisa.comparacao = value.comparacao;
              pesquisa.valor = value.getValue() + ' and ' + value.getValue2();
            } else {
              if ((value.value !== null && value.value !== undefined)) {
                pesquisa.comparacao = '>=';
                pesquisa.valor = value.getValue() ;
              }
              if ( (value.value2 !== null && value.value2 !== undefined)) {
                pesquisa.comparacao = '<=';
                pesquisa.valor = value.getValue2();
              }
            }
            
          } else {
            pesquisa.comparacao = value.comparacao;
            pesquisa.valor = value.getValue();
          }
          this.filtro.pesquisas.push(pesquisa);
        });
      }
    );
  }
}
