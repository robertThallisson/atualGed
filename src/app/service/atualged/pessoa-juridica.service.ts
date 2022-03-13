import { PessoaJuridica } from './../../model/objetc/pessoa-juridica'; 
 import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
 import { AutentificacaoService } from '../autentificacao/autentificacao.service'; 
@Injectable({ 
   providedIn: 'root' 
 }) 
 export class PessoaJuridicaService { 
   private url: string = '/pessoajuridica'; 
   pessoajuridica: PessoaJuridica; 
  
   constructor(private http: HttpClient , public as:AutentificacaoService) { } 
  
   public salvar(pessoajuridica: PessoaJuridica) {
     return this.http.post(this.as.url + this.url, pessoajuridica, this.as.getOptions());
   }
  
   pesquisar(value: string) { 
     return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
   }
   pesquisarUltimosRegistros() {
     return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
   }
 }
 