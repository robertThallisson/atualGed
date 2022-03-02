import { Estado } from "./Estado";

export class Cidade {
  id: number;
  nome: string;
  cep: number;
  estado: Estado;
  ativo: boolean;
}
