import { ConfiguracaoCertificadoService } from './../../../service/atualged/configuracao-certificado.service';
import { Component, OnInit, Input } from '@angular/core';
import { Certificado } from '../../../model/objetc/certificado';
import { Empresa } from '../../../model/objetc/Empresa';
import { Base } from '../../../model/base';

@Component({
  selector: 'app-configuracao-certificado',
  templateUrl: './configuracao-certificado.page.html',
  styleUrls: ['./configuracao-certificado.page.scss'],
})
export class ConfiguracaoCertificadoPage implements OnInit {

  certificado : Certificado = new Certificado();

  @Input()
  empresa:Empresa;
  constructor(
    private base: Base,
    private configuracaoCertificadoService: ConfiguracaoCertificadoService
  ) {}

  ngOnInit() {}

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.salvar();
    }
  }

  salvar() {
    this.certificado.empresa = this.empresa;
    this.base.present();
    this.configuracaoCertificadoService.salvar(this.certificado).subscribe(
      data => {
        this.base.dismiss();
      },
      error => {
        this.base.mensagemErro('Erro ao salvar configuracao de certificado ' + this.base.tratarErro(error) );
      }
    );
  }


  onFileSelected(event: any) {
    console.log(event);
    let files = event.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this.converteToBase64Depois.bind(this);

      reader.readAsBinaryString(file);
    }
    console.log(this.certificado);
  }
  converteToBase64Depois(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.certificado.arquivo = btoa(binaryString);
  }

}
