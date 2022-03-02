import { Cidade } from "./Cidade";

export class PessoaJuridica {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: number;
  logradouro: string;
  bairro: string;
  numero: number;
  complemento: string;
  ativo: boolean;
  cidade: Cidade;
  dataAdessao: any;
  foto: any;
}
