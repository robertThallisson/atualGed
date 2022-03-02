import { Empresa } from './../../model/objetc/empresa'; 
 import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
 import { AutentificacaoService } from '../autentificacao/autentificacao.service'; 
@Injectable({ 
   providedIn: 'root' 
 }) 
 export class EmpresaService { 
   private url: string = '/empresa'; 
   empresa: Empresa; 
  
   constructor(private http: HttpClient , public as:AutentificacaoService) { } 
  
   public salvar(empresa: Empresa) {
     return this.http.post(this.as.url + this.url, empresa, this.as.getOptions());
   }
  
   pesquisar(value: string) { 
     return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
   }
   pesquisarUltimosRegistros() {
     return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
   }
 }
 