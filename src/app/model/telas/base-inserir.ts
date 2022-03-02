import { Base } from './../base';

export enum TipoValidacao {
  MAIOR_IGUAL,
  MENOR_IGUAL,
  ENTRE,
  VAZIO,
  DATA,
}

export class DadosValidar {
  campo: string;
  name: string;
  objetoPaiNuloAceita: boolean = false;
  tipoMensagem: TipoValidacao = TipoValidacao.VAZIO;
  maxValue: any;
  mimValue: any;

  nomeExibicao: string;
  mensagemCustomizada: string;
}

export class BaseInserir {
  campoObrigatorio = 'Campo obrigatório';
  validacoes: Array<DadosValidar>;

  constructor(public base: Base) {
    this.validacoes = new Array<DadosValidar>();
  }

  // validacoes internas ultimo caso

  validar(value: any, validacoes?: Array<DadosValidar>): boolean {
    if (this.base.isNullOrWhiteSpace(validacoes)) {
      validacoes = this.validacoes;
    }
    if (validacoes.length === 0) {
      return true;
    }
    let retorno = false;
    validacoes.forEach((element, index) => {
      const valueField = this.getValue(value, element.campo);
      /*if (element.maiorZero && valueField < 0) {
        this.base.mensagemErro(
          element.nomeExibicao + ' o valor informado deve ser maior que 0'
        );
        return false;
      }*/

      if (index === 0 || retorno) {
        retorno = this.validarItem(element, valueField);
      }

      if (!retorno) {
        return true;
      }
    });

    return retorno;
  }

  validarItem(value: DadosValidar, valueField: any): boolean {
    switch (value.tipoMensagem) {
      case TipoValidacao.VAZIO: {
        if (this.base.isNullOrWhiteSpace(valueField)) {
          this.base.mensagemErroFoca(
            value.mensagemCustomizada
              ? value.mensagemCustomizada
              : value.nomeExibicao + ': ' + this.campoObrigatorio,
            this.foca.bind(this),
            value.name
          );
          return false;
        }
        return true;
      }

      case TipoValidacao.MAIOR_IGUAL: {
        if (
          this.base.isNullOrWhiteSpace(valueField) ||
          valueField < value.maxValue
        ) {
          this.base.mensagemErroFoca(
            value.mensagemCustomizada
              ? value.mensagemCustomizada
              : value.nomeExibicao +
                  ': ' +
                  'o valor informado deve ser maior que ' +
                  value.maxValue,
            this.foca.bind(this),
            value.name
          );
          this.foca(value.name);
          return false;
        }
        return true;
      }
      case TipoValidacao.MENOR_IGUAL: {
        if (
          this.base.isNullOrWhiteSpace(valueField) ||
          valueField > value.mimValue
        ) {
          this.base.mensagemErroFoca(
            value.mensagemCustomizada
              ? value.mensagemCustomizada
              : value.nomeExibicao +
                  ': ' +
                  'o valor informado deve ser menor que ' +
                  value.mimValue,
            this.foca.bind(this),
            value.name
          );
          return false;
        }
        return true;
      }
      case TipoValidacao.ENTRE: {
        if (
          this.base.isNullOrWhiteSpace(valueField) ||
          valueField > value.mimValue ||
          valueField < value.maxValue
        ) {
          this.base.mensagemErroFoca(
            value.mensagemCustomizada
              ? value.mensagemCustomizada
              : value.nomeExibicao +
                  ': ' +
                  'o valor informado deve estar entre ' +
                  value.mimValue +
                  ' e ' +
                  value.maxValue,
            this.foca.bind(this),
            value.name
          );
          return false;
        }
        return true;
      }

      case TipoValidacao.DATA: {
        if (
          this.base.isNullOrWhiteSpace(valueField) ||
          !this.base.isValidDate(valueField)
        ) {
          this.base.mensagemErroFoca(
            value.mensagemCustomizada
              ? value.mensagemCustomizada
              : value.nomeExibicao +
                  ': ' +
                  ' deve ser informado uma data valida',
            this.foca.bind(this),
            value.name
          );
          return false;
        }
        return true;
      }

      default: {
        return true;
      }
    }
  }

  getValue(value: any, field: string) {
    const fields = field.split('.');
    if (fields.length > 1) {
      let novoItem = value;
      fields.forEach((element) => {
        novoItem = novoItem[element];
      });
      return novoItem;
    }
    return value[field];
  }

  // foca da meia noite
  foca(id: string) {
    try {
      const elements = document.getElementsByName(id);
      setTimeout(() => elements[0].focus(), 150);
      elements.forEach((element) => {
        console.log(element);
        console.log(element.outerHTML);
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        setTimeout(() => element.focus(), 150);
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let index = 0; index < element.children.length; index++) {
          const children = element.children[index];
          (children as HTMLElement).focus();
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < children.children.length; i++) {
            const filho = children.children[i];
            console.log(filho);
            console.log(filho.outerHTML);
            if (filho.outerHTML.startsWith('<ion-input')) {
              setTimeout(() => (filho as HTMLElement).focus(), 300);
            }
          }
          setTimeout(() =>  (children as HTMLElement).focus(), 150);
        }
      });
      setTimeout(() => elements[0].focus(), 150);
    } catch (error) {
      console.log(error);
    }
  }

  addItemValidacao(
    campo: string,
    name: string,
    nomeExibicao: string,
    tipoMensagem: TipoValidacao = TipoValidacao.VAZIO,
    mimValue?: any,
    maxValue?: any,
    objetoPaiNuloAceita: boolean = false,
    mensagemCustomizada?: string
  ) {
    this.validacoes.push(
      this.getNewDadosValidar(
        campo,
        name,
        nomeExibicao,
        tipoMensagem,
        mimValue,
        maxValue,
        objetoPaiNuloAceita,
        mensagemCustomizada
      )
    );
  }

  getNewDadosValidar(
    campo: string,
    name: string,
    nomeExibicao: string,
    tipoMensagem: TipoValidacao = TipoValidacao.VAZIO,
    mimValue?: any,
    maxValue?: any,
    objetoPaiNuloAceita: boolean = false,
    mensagemCustomizada?: string
  ) {
    if (tipoMensagem === TipoValidacao.VAZIO && this.base.isNullOrWhiteSpace(maxValue)) {
      maxValue = 0;
    }
    const item: DadosValidar = new DadosValidar();
    item.campo = campo;
    item.name = name;
    item.nomeExibicao = nomeExibicao;
    item.tipoMensagem = tipoMensagem;
    item.mimValue = mimValue;
    item.maxValue = maxValue;
    item.objetoPaiNuloAceita = objetoPaiNuloAceita;
    item.mensagemCustomizada = mensagemCustomizada;

    return item;
  }
}
