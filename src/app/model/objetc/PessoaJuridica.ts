import { Cidade } from "./Cidade";

export class PessoaJuridica {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;

  cep: string;
  logradouro: string;
  bairro: string;
  numero: number;
  complemento: string;
  ativo: boolean;
  cidade: Cidade;
  foto: any;
}
