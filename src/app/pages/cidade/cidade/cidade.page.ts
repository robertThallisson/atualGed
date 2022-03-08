import { CidadeService } from "./../../../service/atualged/cidade.service";
import { Cidade } from "./../../../model/objetc/Cidade";
import { Component, OnInit } from "@angular/core";
import { Base } from "../../../model/base";
import { Router } from "@angular/router";

@Component({
  selector: "app-cidade",
  templateUrl: "./cidade.page.html",
  styleUrls: ["./cidade.page.scss"],
})
export class CidadePage implements OnInit {
  cidades: Array<Cidade>;

  constructor(
    private base: Base,
    public cidadeService: CidadeService,
    private router: Router
  ) {}

  ngOnInit() {}

  excluir(cidade: Cidade) {
    this.base.Confirma(
      "Deseja excluir esse cidade",
      this.removerativo.bind(this),
      cidade
    );
  }
  editar(cidade: Cidade) {
    this.cidadeService.cidade = cidade;
    this.router.navigate(["cidade-inserir"]);
  }

  inserir() {
    this.cidadeService.cidade = new Cidade();
    this.router.navigate(["cidade-inserir"]);
  }

  removerativo(cidade: Cidade) {
    this.base.present();
    cidade.ativo = false;
    this.cidadeService.salvar(cidade).subscribe(
      (data) => {
        this.base.dismiss();
        this.cidades = [];
      },
      (error) => {
        this.base.dismiss();
        this.base.mensagemErro(
          "Falha  ao excluir  cidade " + cidade.id + this.base.tratarErro(error)
        );
      }
    );
  }

  temRegistros(): boolean {
    try {
      return this.cidades.length > 0;
    } catch (error) {
      return false;
    }
  }
}
