import { Estado } from './../../../model/objetc/Estado';
import { EstadoService } from './../../../service/atualged/estado.service';
import { Component, OnInit } from '@angular/core';
import { Base } from '../../../model/base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estado-inserir',
  templateUrl: './estado-inserir.page.html',
  styleUrls: ['./estado-inserir.page.scss'],
})
export class EstadoInserirPage implements OnInit {

  estado: Estado = new Estado(); 
  constructor(
    private estadoService: EstadoService, 
    private base: Base, 
    private router: Router
    ) {

   } 
 
  ngOnInit() {
    if ((this.estadoService.estado !== undefined) && (this.estadoService.estado !== null)) {
      this.estado = this.estadoService.estado;
    }
  }
 
  get editando() {
    return Boolean(this.estado.id);
  } 
 
  salvar() {
    if ((this.estado.ativo === undefined) || (this.estado.ativo === null)) {
      this.estado.ativo = true;
    }
    this.base.present();
    this.estadoService.salvar(this.estado).subscribe(
      data => {
        this.estadoService.estado = new Estado();
        this.base.dismiss();
        this.router.navigate(['Estados']);
      }, error => {
        this.base.dismiss();
        this.base.mensagemErro('Falha ao salvar este estado :' + this.base.tratarErro(error));
      }
    ); 
  }
 
 keyDownFunction(event: any) { 
   if (event.keyCode === 13) {
     this.salvar();
   }
 }


}
