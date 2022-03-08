import { Escritorio } from './escritorio';

export class Pessoa {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  telefone1: string;
  telefone2: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  uf: string;
  estado: string;
  foto: any;
  ativo: boolean;
  escritorio: Escritorio;
}
