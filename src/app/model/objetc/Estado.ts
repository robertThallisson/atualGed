import { Cidade } from "./Cidade";

export class Estado {
  id: number;
  uf: string;
  nome: string;
  ativo: boolean;
  cidade: Array<Cidade>;
}
