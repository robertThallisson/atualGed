import { Router } from '@angular/router';
import { EscritorioService } from './../../../service/atualged/escritorio.service';
import { Base } from './../../../model/base';
import { Component, OnInit } from '@angular/core';
import { Escritorio } from '../../../model/objetc/escritorio';

@Component({
  selector: 'app-escritorios',
  templateUrl: './escritorios.page.html',
  styleUrls: ['./escritorios.page.scss'],
})
export class EscritoriosPage implements OnInit {

  escritorios: Array<Escritorio>; 
  
  constructor( 
    private base: Base,
    public escritorioService: EscritorioService,
    private router: Router
    ) {
  }
 
 ngOnInit() { }
 
  excluir(escritorio: Escritorio) {
    this.base.Confirma('Deseja excluir esse escritorio', this.removerativo.bind(this), escritorio);
 
  }
  editar(escritorio: Escritorio) { 
    this.escritorioService.escritorio = escritorio;
    this.router.navigate(['escritorio-inserir']);
  }
 
  inserir() {
    this.escritorioService.escritorio = new Escritorio();
    this.router.navigate(['escritorio-inserir']); 
  }
 
  removerativo(escritorio: Escritorio) {
    this.base.present();
    //escritorio.ativo = false;
    this.escritorioService.salvar(escritorio).subscribe(
      data => {
        this.base.dismiss();
        this.escritorios = []; 
    }, error => { 
        this.base.dismiss();
        this.base.mensagemErro('Falha  ao excluir  escritorio ' + escritorio.id 
        + this.base.tratarErro(error));
      }
    );
  }
 
 
  temRegistros(): boolean {
    try {
      return this.escritorios.length > 0;
    } catch (error) {
      return false;
    }
  }
 


}
