import { Cidade } from "./Cidade";

export class Estado {
  id: number;
  uf: string;
  nome: string;
  ativo: boolean;
  ibge: number;
  pais: any;
  ddd: string;
  cidade: Array<Cidade>;
}
