import { StatusItemInspecionado } from './../../model/objetc/status-item-inspecionado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class StatusItemInspecionadoService {

  private url: string = '/statusiteminspecionado';
  constructor(private http: HttpClient , public as:AutentificacaoService) { }

  salvar(status: StatusItemInspecionado, idItem: number) {
    return this.http.post(this.as.url + this.url + '/' + idItem.toString(), status, this.as.getOptions());
  }

  reabrir(status: StatusItemInspecionado, idItem: number) {
    return this.http.post(this.as.url + this.url + '/reabri/' + idItem.toString(), status, this.as.getOptions());
  }
}
