import { Pessoa } from './Pessoa';
import { PerfilUsuario } from "./PerfilUsuario";

export class Usuario {
  id: number;
  login: string;
  email: string;
  senha: string;
  dataBloqueio: any;
  ativo: boolean;
  pessoa: Pessoa;
  perfilUsuario: PerfilUsuario;
}
