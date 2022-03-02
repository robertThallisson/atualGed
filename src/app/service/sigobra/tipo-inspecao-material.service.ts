import { TipoInspecaoMaterial } from './../../model/objetc/tipo-inspecao-material'; 
 import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
 import { AutentificacaoService } from '../autentificacao/autentificacao.service'; 
@Injectable({ 
   providedIn: 'root' 
 }) 
 export class TipoInspecaoMaterialService { 
   private url: string = '/tipoinspecaomaterial'; 
   tipoinspecaomaterial: TipoInspecaoMaterial; 
  
   constructor(private http: HttpClient , public as:AutentificacaoService) { } 
  
   public salvar(tipoinspecaomaterial: TipoInspecaoMaterial) {
     return this.http.post(this.as.url + this.url, tipoinspecaomaterial, this.as.getOptions());
   }
  
   pesquisar(value: string) { 
     return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
   }
   pesquisarUltimosRegistros() {
     return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
   }
 }
 