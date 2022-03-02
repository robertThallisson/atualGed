import { PerfilUsuario } from "./PerfilUsuario";
import { PessoaJuridica } from "./PessoaJuridica";

export class Usuario {
  id: number;
  login: string;
  email: string;
  senha: string;
  dataBloqueio: any;
  ativo: boolean;
  pessoaJuridica: PessoaJuridica;
  perfilUsuario: PerfilUsuario;
}
