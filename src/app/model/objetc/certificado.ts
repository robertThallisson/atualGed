import { Empresa } from "./empresa";

export class Certificado {
    id: number;
    tipo: string;
    emitido: string;
    validadeIni: any;
    validadeFim: any;
    serial: string;
    pin: number;
    arquivo: any;
    senha: string;
    empresa: Empresa;
}
