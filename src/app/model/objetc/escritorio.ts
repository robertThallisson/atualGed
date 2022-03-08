import { PessoaJuridica } from "./PessoaJuridica";
import { Contador } from "./Contador";
export class Escritorio {
  id: number;
  ativo: boolean;
  pessoaJuridica: PessoaJuridica;
  dataAdessao: any;
  contador: Array<Contador>;
  valorBase: number;
  valorPorCliente: number;
  baseCliente: number;
}
