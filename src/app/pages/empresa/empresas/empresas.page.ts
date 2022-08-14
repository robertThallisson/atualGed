import { ConfiguracaoCertificadoPage } from './../configuracao-certificado/configuracao-certificado.page';
import { ModalController } from '@ionic/angular';
import { EmpresaService } from './../../../service/atualged/empresa.service';
import { Empresa } from './../../../model/objetc/Empresa';
import { Component, OnInit } from '@angular/core';
import { Base } from '../../../model/base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {
  empresas: Array<Empresa>;

  constructor(
    private base: Base,
    public empresaService: EmpresaService,
    private router: Router,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  excluir(empresa: Empresa) {
    this.base.Confirma(
      'Deseja excluir esse empresa',
      this.removerativo.bind(this),
      empresa
    );
  }
  editar(empresa: Empresa) {
    this.empresaService.empresa = empresa;
    this.router.navigate(['empresa-inserir']);
  }

  inserir() {
    this.empresaService.empresa = new Empresa();
    this.router.navigate(['empresa-inserir']);
  }

  removerativo(empresa: Empresa) {
    this.base.present();
    empresa.ativo = false;
    this.empresaService.salvar(empresa).subscribe(
      (data) => {
        this.base.dismiss();
        this.empresas = [];
      },
      (error) => {
        this.base.dismiss();
        this.base.mensagemErro(
          'Falha  ao excluir  empresa ' +
            empresa.id +
            this.base.tratarErro(error)
        );
      }
    );
  }

  async addCertificado(empresa: Empresa) {
    const modal = await this.modalController.create({
      component: ConfiguracaoCertificadoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'empresa': empresa
      },
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
  }

  temRegistros(): boolean {
    try {
      return this.empresas.length > 0;
    } catch (error) {
      return false;
    }
  }
}
