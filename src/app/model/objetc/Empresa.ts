import { Escritorio } from './escritorio';
import { PessoaJuridica } from "./PessoaJuridica";

export class Empresa {
  constructor(){
    this.pessoaJuridica = new PessoaJuridica();
  }
  id: number;
  ativo: boolean;
  pessoaJuridica: PessoaJuridica;
  //socios: Array<List>;
  //notas: Array<List>;
  uf: string;
  escritorio: Escritorio;
}
