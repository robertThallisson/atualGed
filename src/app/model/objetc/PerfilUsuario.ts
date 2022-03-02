import { Permissao } from './Permissao';
export class PerfilUsuario {
  id: number;
  nome: string;
  //empresa: Empresa;
  permissoes: Array<Permissao>;
}
