export class Funcoes {
}

export function isNullOrWhiteSpace(value: any): boolean {
    if (value === null || value === undefined) {
        return true;
      }
      // Convert value to string in case if it's not.
      return value.toString().replace(/\s/g, '').length < 1;
}

export function getLanguage() {
  let language = localStorage.getItem('language');
  if (isNullOrWhiteSpace(language)) {
    language = 'pt';
  }

  return language;
}

export function  delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export function pad(character: string, count: number, value: string, left: boolean) {
  const pad = character.repeat(count);
  if (typeof value === 'undefined') {
    return pad;
  }
  if (left) {
    return (pad + value).slice(-pad.length);
  } else {
    return (value + pad).substring(0, pad.length);
  }
}

export function formatCPF(cpf: String) {
  const aux = this.onlyNumbers(cpf);
  return `${aux.substring(0, 3)}.${aux.substring(3, 6)}.${aux.substring(6, 9)}-${aux.substring(9)}`;
}

export function formatCNPJ(cnpj: String) {
  const aux = this.onlyNumbers(cnpj);
  return `${aux.substring(0, 2)}.${aux.substring(2, 5)}.${aux.substring(5, 8)}/${aux.substring(8, 12)}-${aux.substring(12)}`;
}

export function toHex(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
