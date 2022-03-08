import { Estado } from './../../../model/objetc/Estado';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Base } from '../../../model/base';
import { EstadoService } from '../../../service/atualged/estado.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
})
export class EstadosPage implements OnInit {

  estados: Array<Estado>; 
  
   constructor( 
     private base: Base,
     public estadoService: EstadoService,
     private router: Router
     ) {
   }
  
  ngOnInit() { }
  
   excluir(estado: Estado) {
     this.base.Confirma('Deseja excluir esse estado', this.removerativo.bind(this), estado);
  
   }
   editar(estado: Estado) { 
     this.estadoService.estado = estado;
     this.router.navigate(['estado-inserir']);
   }
  
   inserir() {
     this.estadoService.estado = new Estado();
     this.router.navigate(['estado-inserir']); 
   }
  
   removerativo(estado: Estado) {
     this.base.present();
     estado.ativo = false;
     this.estadoService.salvar(estado).subscribe(
       data => {
         this.base.dismiss();
         this.estados = []; 
     }, error => { 
         this.base.dismiss();
         this.base.mensagemErro('Falha  ao excluir  estado ' + estado.id 
         + this.base.tratarErro(error));
       }
     );
   }
  
  
   temRegistros(): boolean {
     try {
       return this.estados.length > 0;
     } catch (error) {
       return false;
     }
   }
  
 

}
