import { PessoaJuridica } from "./../../../model/objetc/PessoaJuridica";
import { Base } from "./../../../model/base";
import { Router } from "@angular/router";
import { EscritorioService } from "./../../../service/atualged/escritorio.service";
import { Component, OnInit } from "@angular/core";
import { Escritorio } from "../../../model/objetc/escritorio";
import { isNullOrWhiteSpace } from "../../../funcoes/funcoes";

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
    private router: Router
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

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.salvar();
    }
  }
}
