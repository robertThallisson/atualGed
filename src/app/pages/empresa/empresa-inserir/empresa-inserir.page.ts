import { CidadeService } from './../../../service/atualged/cidade.service';
import { EmpresaService } from './../../../service/atualged/empresa.service';
import { Component, OnInit } from "@angular/core";
import { Base } from '../../../model/base';
import { Router } from '@angular/router';
import { Empresa } from '../../../model/objetc/Empresa';
import { isNullOrWhiteSpace } from '../../../funcoes/funcoes';

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
    private router: Router,
    public cs: CidadeService
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
        this.router.navigate(["empresas"]);
      },
      (error) => {
        this.base.dismiss();
        this.base.mensagemErro(
          "Falha ao salvar este empresa :" + this.base.tratarErro(error)
        );
      }
    );
  }
  consultaCEP(cep) {
    this.base.consultaCEP(cep, this.popula.bind(this));
  }
  popula(cep) {
    if (cep.erro !== undefined && cep.erro !== null && cep.erro) {
      this.base.mensagemErro('Falha ao consultar endereço do CEP');
      return;
    }
    this.empresa.pessoaJuridica.logradouro = cep.logradouro;
    this.empresa.pessoaJuridica.complemento = cep.complemento;
    this.empresa.pessoaJuridica.bairro = cep.bairro;


    this.cs.pesquisar(cep.ibge).subscribe(
      data => {
        const value = data as any;
        if(!isNullOrWhiteSpace(value) && value.length ) {
          this.empresa.pessoaJuridica.cidade = value[0];
        }
      },
      error => {

      }
    );
  }
  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.salvar();
    }
  }
}
