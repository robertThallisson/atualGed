import { TipoNotificacao } from '../enums/tipo-notificacao.enum';

export class Notificacao {
    tipoNotificacao: TipoNotificacao;
    mensagem: string;
    empresaId: number;
}
