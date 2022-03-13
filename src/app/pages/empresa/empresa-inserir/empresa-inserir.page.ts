import { EmpresaService } from './../../../service/atualged/empresa.service';
import { Component, OnInit } from "@angular/core";
import { Base } from '../../../model/base';
import { Router } from '@angular/router';
import { Empresa } from '../../../model/objetc/Empresa';

@Component({
  selector: "app-empresa-inserir",
  templateUrl: "./empresa-inserir.page.html",
  styleUrls: ["./empresa-inserir.page.scss"],
})
export class EmpresaInserirPage implements OnInit {
  empresa: Empresa = new Empresa();
  constructor(
    private empresaService: EmpresaService,
    private base: Base,
    private router: Router
  ) {}

  ngOnInit() {
    if (
      this.empresaService.empresa !== undefined &&
      this.empresaService.empresa !== null
    ) {
      this.empresa = this.empresaService.empresa;
    }
  }

  get editando() {
    return Boolean(this.empresa.id);
  }

  salvar() {
    if (this.empresa.ativo === undefined || this.empresa.ativo === null) {
      this.empresa.ativo = true;
    }
    if (this.empresa.escritorio === undefined || this.empresa.escritorio === null) {
      this.empresa.escritorio = this.empresaService.as.token.escritorio;
    }
    this.base.present();
    this.empresaService.salvar(this.empresa).subscribe(
      (data) => {
        this.empresaService.empresa = new Empresa();
        this.base.dismiss();
        this.router.navigate(["Empresas"]);
      },
      (error) => {
        this.base.dismiss();
        this.base.mensagemErro(
          "Falha ao salvar este empresa :" + this.base.tratarErro(error)
        );
      }
    );
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.salvar();
    }
  }
}
