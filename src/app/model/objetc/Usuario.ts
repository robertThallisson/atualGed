import { PerfilUsuario } from './perfil-usuario';
import { Pessoa } from './Pessoa';

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
