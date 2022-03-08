import { Estado } from './../../model/objetc/estado'; 
 import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
 import { AutentificacaoService } from '../autentificacao/autentificacao.service'; 
@Injectable({ 
   providedIn: 'root' 
 }) 
 export class EstadoService { 
   private url: string = '/estado'; 
   estado: Estado; 
  
   constructor(private http: HttpClient , public as:AutentificacaoService) { } 
  
   public salvar(estado: Estado) {
     return this.http.post(this.as.url + this.url, estado, this.as.getOptions());
   }
  
   pesquisar(value: string) { 
     return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
   }
   pesquisarUltimosRegistros() {
     return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
   }
 }
 