import { PessoaJuridica } from './PessoaJuridica';
import { Contador } from './Contador';
export class Escritorio {
    id: number;
    ativo: boolean;
    pessoaJuridica: PessoaJuridica;
    contador: Array<Contador>;
}
