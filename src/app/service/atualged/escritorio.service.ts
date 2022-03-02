import { Escritorio } from './../../model/objetc/escritorio'; 
 import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
 import { AutentificacaoService } from '../autentificacao/autentificacao.service'; 
@Injectable({ 
   providedIn: 'root' 
 }) 
 export class EscritorioService { 
   private url: string = '/escritorio'; 
   escritorio: Escritorio; 
  
   constructor(private http: HttpClient , public as:AutentificacaoService) { } 
  
   public salvar(escritorio: Escritorio) {
     return this.http.post(this.as.url + this.url, escritorio, this.as.getOptions());
   }
  
   pesquisar(value: string) { 
     return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
   }
   pesquisarUltimosRegistros() {
     return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
   }
 }
 