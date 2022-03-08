import { PessoaJuridica } from "./PessoaJuridica";

export class Empresa {
  id: number;
  ativo: boolean;
  pessoaJuridica: PessoaJuridica;
  socios: Array<any>;
  notas: Array<any>;
  uf: string;
  
  dataAdessao: any;
}
