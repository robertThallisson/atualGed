import { Permissao } from './permissao';
import { Escritorio } from './escritorio';

export class PerfilUsuario {
    id: number;
    nome: string;
    escritorio: Escritorio;
    permissoes: Array<Permissao>;
}
