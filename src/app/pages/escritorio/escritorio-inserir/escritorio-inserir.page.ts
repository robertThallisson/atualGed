import { Estado } from './../../../model/enums/estado.enum';
import { PessoaJuridica } from "./../../../model/objetc/PessoaJuridica";
import { Base } from "./../../../model/base";
import { Router } from "@angular/router";
import { EscritorioService } from "./../../../service/atualged/escritorio.service";
import { Component, OnInit } from "@angular/core";
import { Escritorio } from "../../../model/objetc/escritorio";
import { isNullOrWhiteSpace } from "../../../funcoes/funcoes";
import { CidadeService } from '../../../service/atualged/cidade.service';

@Component({
  selector: "app-escritorio-inserir",
  templateUrl: "./escritorio-inserir.page.html",
  styleUrls: ["./escritorio-inserir.page.scss"],
})
export class EscritorioInserirPage implements OnInit {
  escritorio: Escritorio = new Escritorio();
  constructor(
    private escritorioService: EscritorioService,
    private base: Base,
    private router: Router,
    public cs: CidadeService
  ) {}

  ngOnInit() {
    if (
      this.escritorioService.escritorio !== undefined &&
      this.escritorioService.escritorio !== null
    ) {
      this.escritorio = this.escritorioService.escritorio;
    }

    if (isNullOrWhiteSpace(this.escritorio.pessoaJuridica)) {
      this.escritorio.pessoaJuridica = new PessoaJuridica();
    }
  }

  get editando() {
    return Boolean(this.escritorio.id);
  }

  salvar() {
    if (this.escritorio.ativo === undefined || this.escritorio.ativo === null) {
      this.escritorio.ativo = true;
    }
    this.base.present();
    this.escritorioService.salvar(this.escritorio).subscribe(
      (data) => {
        this.escritorioService.escritorio = new Escritorio();
        this.base.dismiss();
        this.base.menssagemSucesso("Escritorio salvo com sucesso");
      },
      (error) => {
        this.base.dismiss();
        this.base.mensagemErro(
          "Falha ao salvar este escritorio :" + this.base.tratarErro(error)
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
    this.escritorio.pessoaJuridica.logradouro = cep.logradouro;
    this.escritorio.pessoaJuridica.complemento = cep.complemento;
    this.escritorio.pessoaJuridica.bairro = cep.bairro;


    this.cs.pesquisar(cep.ibge).subscribe(
      data => {
        const value = data as any;
        if(!isNullOrWhiteSpace(value) && value.length ) {
          this.escritorio.pessoaJuridica.cidade = value[0];
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
