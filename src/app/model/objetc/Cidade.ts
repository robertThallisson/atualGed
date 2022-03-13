import { Estado } from "./Estado";

export class Cidade {
  id: number;
  nome: string;
  cep: number;
  ibge: number;
  estado: Estado;
  ativo: boolean;
  latLon: string;
  latitude: number;
  longitude: number;
  codTom: number;
}
