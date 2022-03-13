import { Usuario } from '../objetc/usuario';
import { Escritorio } from '../objetc/escritorio';
export class Token {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    nome: string;
    sti: string;
    usuario: Usuario;
    escritorio: Escritorio;
    modulo: any;
}
