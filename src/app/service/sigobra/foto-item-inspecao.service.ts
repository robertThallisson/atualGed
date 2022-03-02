import { FotoItemInspecao } from './../../model/objetc/foto-item-inspecao'; 
 import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
 import { AutentificacaoService } from '../autentificacao/autentificacao.service'; 
import { ItemInspecao } from '../../model/objetc/inspecaoitemtipoinspecao';
@Injectable({ 
   providedIn: 'root' 
 }) 
 export class FotoItemInspecaoService { 
   private url: string = '/fotoiteminspecao'; 
   fotoiteminspecao: FotoItemInspecao; 
  
   constructor(private http: HttpClient , public as:AutentificacaoService) { } 
  
   public getByItemInspecao(itemInspecao: ItemInspecao) {
     return this.http.post(this.as.url + this.url + '/getbyiteminspecao', itemInspecao, this.as.getOptions());
   }
  
 }
 