import { CidadeService } from './../../../service/atualged/cidade.service';
import { EscritorioService } from './../../../service/atualged/escritorio.service';
import { UsuarioService } from './../../../service/atualged/usuario.service';

import { Base } from './../../../model/base';
import { Usuario } from './../../../model/objetc/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from '../../../model/objetc/pessoa';
import { Empresa } from '../../../model/objetc/empresa';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ViacepService } from './../../../service/viacep/viacep.service';
import { Estado } from '../../../model/enums/estado.enum';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { isNullOrWhiteSpace } from '../../../funcoes/funcoes';


@Component({
  selector: 'app-usuario-inserir',
  templateUrl: './usuario-inserir.page.html',
  styleUrls: ['./usuario-inserir.page.scss'],
})
export class UsuarioInserirPage implements OnInit {


  usuario: Usuario = new Usuario();
  constructor(private router: Router,
    public base: Base,
    public escritorioService: EscritorioService,
    public us: UsuarioService,
    private vcs: ViacepService,
    private cidadeServe: CidadeService,
    private camera: Camera) { }

  selecionarusuario(evente: any) {

  }
  ngOnInit() {
    if (this.us.usuario !== undefined && this.us.usuario !== null) {
      this.usuario = this.us.usuario;
    } else {
      this.usuario.pessoa = new Pessoa();
    }
  }

  remover(usuario: any) {

  }

  salvar() {
    this.base.present();
    this.usuario.pessoa.ativo = true;
    this.usuario.ativo = true;
    this.us.salvar(this.usuario).subscribe(
      data => {
        this.us.usuario = null;
        this.base.dismiss();
        this.router.navigate(['/usuarios']);
      }, error => {
        this.base.dismiss();
        this.base.mensagemErro('Falhar ao salvar usuario ' + this.base.tratarErro(error));
      }
    );
  }

  keyDownFunction(event: any) {

  }

  selecionarProfissionais(event: any) {

  }
  consultaCEP(cep) {

    if (cep !== null && cep !== undefined && cep !== '') {
      cep = cep.replace(/\D/g, '');
      if (cep.length > 7) {
        this.base.present();
        this.vcs.consultaCEP(cep).subscribe(
          data => {
            this.base.dismiss();
            this.popula(data);
          }, error => {
            this.base.dismiss();
            this.base.mensagemErro('Falha ao buscar CEP :' + this.base.tratarErro(error));
          }
        );
      }
    }
  }

  popula(cep) {
    if (cep.erro !== undefined && cep.erro !== null && cep.erro) {
      this.base.mensagemErro('Falha ao consultar endereço do CEP');
      return;
    }
    this.usuario.pessoa.logradouro = cep.logradouro;
    this.usuario.pessoa.complemento = cep.complemento;
    this.usuario.pessoa.bairro = cep.bairro;
    //this.usuario.pessoa.cidade = data.localidade;
    this.usuario.pessoa.uf = cep.uf;
    for (var uf in Estado) {
      if (cep.uf === uf) {
        this.usuario.pessoa.estado = Estado[uf];
        break;
      }
    }

    this.cidadeServe.pesquisar(cep.ibge).subscribe(
      data => {
        const value = data as any;
        if(!isNullOrWhiteSpace(value) && value.length ) {
          this.usuario.pessoa.cidade = value[0];
        }
      },
      error => {

      }
    );
  }

  temFoto() {
    try {
      return this.usuario.pessoa.foto !== null && this.usuario.pessoa.foto !== undefined;
    } catch (error) {
      return false;
    }
  }

  addFoto(local: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: local
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.usuario.pessoa.foto = imageData;
    }, (err) => {
      // Handle error
    })
  }

  tirarFoto() {
    this.addFoto(1);
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
  }
  converteToBase64Depois(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.usuario.pessoa.foto = btoa(binaryString);
  }

}
