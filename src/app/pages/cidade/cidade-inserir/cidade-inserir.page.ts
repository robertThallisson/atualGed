import { EstadoService } from './../../../service/atualged/estado.service';
import { CidadeService } from './../../../service/atualged/cidade.service';
import { Cidade } from './../../../model/objetc/Cidade';
import { Component, OnInit } from '@angular/core';
import { Base } from '../../../model/base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cidade-inserir',
  templateUrl: './cidade-inserir.page.html',
  styleUrls: ['./cidade-inserir.page.scss'],
})
export class CidadeInserirPage implements OnInit {

  cidade: Cidade = new Cidade(); 
   constructor(
     private cidadeService: CidadeService, 
     private base: Base, 
     private router: Router,
     public estadoService: EstadoService
     ) { } 
  
   ngOnInit() {
     if ((this.cidadeService.cidade !== undefined) && (this.cidadeService.cidade !== null)) {
       this.cidade = this.cidadeService.cidade;
     }
   }
  
   get editando() {
     return Boolean(this.cidade.id);
   } 
  
   salvar() {
     if ((this.cidade.ativo === undefined) || (this.cidade.ativo === null)) {
       this.cidade.ativo = true;
     }

     this.base.present();
     this.cidadeService.salvar(this.cidade).subscribe(
       data => {
         this.cidadeService.cidade = new Cidade();
         this.base.dismiss();
         this.router.navigate(['Cidade']);
       }, error => {
         this.base.dismiss();
         this.base.mensagemErro('Falha ao salvar este cidade :' + this.base.tratarErro(error));
       }
     ); 
   }
  
  keyDownFunction(event: any) { 
  	if (event.keyCode === 13) {
  		this.salvar();
  	}
  }
 

}
