import { PessoaJuridica } from './objetc/PessoaJuridica';
//import { Empresa } from './objetc/empresa';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import {
  Platform,
  ModalController,
  ActionSheetController,
  PopoverController,
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
//import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import * as moment from 'moment';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
//import 'rxjs/add/operator/map';
import * as FileSaver from 'file-saver';
import { UsuarioService } from '../service/sigobra/usuario.service';
import { AutentificacaoService } from '../service/autentificacao/autentificacao.service';
import { Usuario } from './objetc/usuario';
import { Token } from './seguranca/token';
import { ViacepService } from '../service/viacep/viacep.service';
import { Pesquisa } from './objetc/filtro/pesquisa';

@Injectable({
  providedIn: 'root',
})
export class Base {
  private isLoading: boolean = false;
  public perguntarModulo: boolean = false;
	private administrador : boolean = undefined;
  constructor(
    public platform: Platform,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    public router: Router,
    public toast: ToastController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    //public camera: Camera,
    private opener: FileOpener,
    private file: File,
    private as: AutentificacaoService,
    private us: UsuarioService,
    private viaCepService: ViacepService
  ) {}


	isAdministrador() {
    if (this.as.token == null) {
      this.administrador = undefined;
      return false;
    }
    if (this.administrador === undefined) {
      this.administrador = this.as.token.usuario.login.toLowerCase() === 'admin' ||
      this.as.token.usuario.login.toLowerCase() === 'administrador';
      let achou = false;
      if (
        !this.administrador &&
        !this.isNullOrWhiteSpace(this.as.token.usuario.perfilUsuario) &&
        !this.isNullOrWhiteSpace(this.as.token.usuario.perfilUsuario.permissoes)
      ) {
        this.as.token.usuario.perfilUsuario.permissoes.forEach(
          element =>{
            if (achou) {
              return;
            }
            if (element.descricao.trim() === 'Administrador - Ultra') {
              achou = true;
            }
          }
        );
        this.administrador =  achou;
      }
    }
    return this.administrador;
  }

  resetAdministrador() {
    this.administrador = undefined;
  }
  public getImagem(value) {
    if ( this.isNullOrWhiteSpace(value) ) {
      return '/assets/img/employdefault.jpg';
    }
    return 'data:image/jpeg;base64,' + value;
  }

  getImagemLogoEmpresa() {
    try {
      //return this.getImagem(this.as.token.empresa.logo);
    } catch (error) {
      return '';
    }
  }

  toFloat(value: any) {
    const result = parseFloat(value.toString().replace(',', '.'));
    console.log(result);
    return result;
  }

  toMoney(value: any): string {
    if (this.isNullOrWhiteSpace(value)) {
      return value;
    }
    if (value.toString().indexOf(',') !== -1) {
      return value.toString();
    }
    if (value.toString().indexOf('.') === -1) {
      return value.toString() + ',00';
    }
    return value.toString().replace('.', ',');
  }

  toFloatString(value: any): number {
    const result = parseFloat(value.toString().replace(',', ''));
    console.log(result);
    return result;
  }

  toNumber(value: any): number {
    if (this.isNullOrWhiteSpace(value)) {
      return value;
    }
    let result = value.toString().replace('.', '');
    result = parseFloat(result.toString().replace(',', '.'));
    return result;
  }

  apenasNumeros(value: string): string {
    return value.replace(/[^0-9]/g, '');
  }

  formatS(date: Date) {
    /*
            let time = date.getTime().toString();
            let dia = date.getDate().toString().split('-');
            let s = dia[0] + '/' + dia[1] + '/' + dia[2] + ' ' + time.substring(0, 8); */

    const teste = moment(date).format('DD/MM/YYYY HH:mm');
    return teste as any;
  }
  formateDataNoTime(date: Date): string {
    const teste = moment(date).format('DD/MM/YYYY');
    return (teste as any).toString();
  }
  toDate(value: string) {
    return moment(value, 'DD/MM/YYYY HH:mm').toDate();
  }

  toDateNoTime(value: string) {
    return moment(value, 'DD/MM/YYYY').toDate();
  }

  dateNoFormat(value: string) {
    return this.formateDataNoTime(moment(value, 'YYYYMMDD').toDate());
  }

  toMoment(value: string) {
    return moment(value, 'DD/MM/YYYY HH:mm');
  }

  nowString() {
    return this.formatS(new Date());
  }
  nowStringNoTime() {
    return this.formateDataNoTime(new Date());
  }

  isValidDate(data: string): boolean {
    try {
      const dtArray = data.split('/');

      if (dtArray === null) {
        return false;
      }

      // Checks for dd/mm/yyyy format.
      let dtDay;
      let dtMonth;
      let dtYear;
      try {
        dtDay = Number(dtArray[0] as any as number);
        dtMonth = Number(dtArray[1] as any as number);
        dtYear = Number((dtArray[2]).substring(0, 4) as any as number);

        // eslint-disable-next-line use-isnan
        if (isNaN(dtDay) || isNaN(dtMonth) || isNaN(dtYear)) {
          return false;
        }
      } catch (error) {
        return false;
      }
      if (dtMonth < 1 || dtMonth > 12) {
        return false;
      } else if (dtDay < 1 || dtDay > 31) {
        return false;
      } else if (
        (dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) &&
        dtDay === 31
      ) {
        return false;
      } else if (dtMonth === 2) {
        const isleap =
          dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0);
        if (dtDay > 29 || (dtDay === 29 && !isleap)) {
          return false;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  isValidDateHora(data: string): boolean {
    try {
      const dataHora =  data.split(' ');

      if (this.isNullOrWhiteSpace(dataHora)) {
        return false;
      }

      if (!this.isValidDate(dataHora[0])) {
        return false;
      }

      const horaMinuto = dataHora[1].split(':');
      if (this.isNullOrWhiteSpace(horaMinuto)) {
        return false;
      }
      const hora = horaMinuto[0] as any;
      const minuto = horaMinuto[1] as any;

      if (hora > 23) {
        return false;
      }

      if (minuto >= 60) {
        return false;
      }

      return true;

    } catch (error) {
      return false;
    }
  }

  isNullOrWhiteSpace(value: any) {
    // eslint-disable-next-line use-isnan
    if (value === null || value === undefined || value === NaN) {
      return true;
    }
    // Convert value to string in case if it's not.
    return value.toString().replace(/\s/g, '').length < 1;
  }

  retiraPercentutal(valor: number, percentual: number): number {
    try {
      return (percentual / 100) * valor;
    } catch (error) {
      return 0;
    }
  }

  descobrirPercentual(valor: number, parteDoValor: number) {
    try {
      return (parteDoValor / valor) * 100;
    } catch (error) {
      return 0;
    }
  }

  especialCharMask (especialChar: string): string {
    especialChar = especialChar.replace(/[áàãâä]/ui, 'a');
    especialChar = especialChar.replace(/[éèêë]/ui, 'e');
    especialChar = especialChar.replace(/[íìîï]/ui, 'i');
    especialChar = especialChar.replace(/[óòõôö]/ui, 'o');
    especialChar = especialChar.replace(/[úùûü]/ui, 'u');
    especialChar = especialChar.replace(/[ç]/ui, 'c');
   /* especialChar = especialChar.replace('/[ÁÀÃÂÄ]/ui', 'a');
    especialChar = especialChar.replace('/[ÉÈÊË]/ui', 'e');
    especialChar = especialChar.replace('/[ÍÌÎÏ]/ui', 'i');
    especialChar = especialChar.replace('/[ÓÒÕÔÖ]/ui', 'o');
    especialChar = especialChar.replace('/[ÚÙÛÜ]/ui', 'u');
    especialChar = especialChar.replace('/[Ç]/ui', 'c');*/;
    return especialChar;
  }

  consultaCEP(cep: any, funcaoPopula?: any) {
    if (cep !== null && cep !== undefined && cep !== '') {
      cep = cep.replace(/\D/g, '');
      if (cep.length > 7) {
        this.present();
        this.viaCepService.consultaCEP(cep).subscribe(
          (data) => {
            const result = data as any;
            this.dismiss();
            if (
              this.isNullOrWhiteSpace(result) ||
              !this.isNullOrWhiteSpace(result.erro)
            ) {
              this.mensagemErro('Falha ao consultar endereço do CEP');
              return;
            }
            if (!this.isNullOrWhiteSpace(funcaoPopula)) {
              funcaoPopula(result);
            }
          },
          (error) => {
            this.dismiss();
            this.mensagemErro('Falha ao buscar CEP :' + this.tratarErro(error));
          }
        );
      }
    }
  }

  newPesquisa(nome: string, comparacao: string, valor: string): Pesquisa {
    const pesquisa: Pesquisa = new Pesquisa();
    pesquisa.nome = nome;
    pesquisa.comparacao = comparacao;
    pesquisa.valor = valor;

    return pesquisa;
  }



  compareWithEnumFn = (oldValue: any, newValue: any) => {
    console.log(oldValue + ' - ' + newValue);
    try {
      return oldValue === newValue;
    } catch (error) {
      newValue = oldValue;
      return false;
    }

  }

  getNumeros(value: string): string {
    return value.replace(/([^\d])+/gim, '');
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true,
    });
    return await popover.present();
  }

  async mensagemErro(msg: string) {
    //     msg =  msg.replace('\n', '</br>');
    //    msg =  msg.replace('#13#10', '</br>');
    if (this.isLoading) {
      this.dismiss();
    }
    msg = msg.split('\n').join('</br>');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-erro',
      header: 'Erro',
      message: '<strong style=\'color = black;\'>' + msg + ' </strong>',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
      ],
    });
    await alert.present();
    const { data } = await alert.onWillDismiss();
    console.log(data);
  }

  agrupar(list: Array<any>, fieldGrouping: string, fieldValue: string ): Array<any> {
    if (this.isNullOrWhiteSpace(list) || this.isNullOrWhiteSpace(fieldGrouping) || this.isNullOrWhiteSpace(fieldValue)) {
      return null;
    }
  }

  agruparOfMonth(list: Array<any>, fieldGrouping: string, fieldsValue: Array<string>): Array<any> {
    if (this.isNullOrWhiteSpace(list) || this.isNullOrWhiteSpace(fieldGrouping) || this.isNullOrWhiteSpace(fieldsValue)) {
      return null;
    }

    const listAgrupada = [];
    list.forEach(element => {
      const dataValue = this.toDateNoTime(element[fieldGrouping]);
      const fieldValue = this.monthNumericToLiteral((dataValue.getMonth() + 1).toString()) + '/' + dataValue.getFullYear();
      let achou = false;
      listAgrupada.forEach(
        element2 => {
          const fieldAtual = element2[fieldGrouping];

          if (fieldAtual === fieldValue) {
            achou = true;

            fieldsValue.forEach(
              fieldElement => {
                element2[fieldElement] += element[fieldElement];
              }
            );
          }
        }
      );

      if (!achou) {
        const newValue = {};
        newValue[fieldGrouping] = fieldValue;
        fieldsValue.forEach(
          fieldElement => {
            newValue[fieldElement] = element[fieldElement];
          }
        );

        listAgrupada.push(newValue);
      }
    });

    return listAgrupada;
  }

  monthNumericToLiteral(month: string): string {
    let value = 'sem mês';
    if (this.isNullOrWhiteSpace(month)) {
      return value;
    }

    switch (month) {
      case '1' : value = 'Janeiro' ; break;
      case '2' : value = 'Fevereiro' ; break;
      case '3' : value = 'Março' ; break;
      case '4' : value = 'Abril' ; break;
      case '5' : value = 'Maio' ; break;
      case '6' : value = 'Junho' ; break;
      case '7' : value = 'Julho' ; break;
      case '8' : value = 'Agosto' ; break;
      case '9' : value = 'Setembro' ; break;
      case '10' : value = 'Outubro' ; break;
      case '11' : value = 'Novenbro' ; break;
      case '12' : value = 'Dezembro' ; break;
    }

    return value;
  }
  getValueField(value:any, field: string) {
    if (this.isNullOrWhiteSpace(value)) {
      return '';
    }

    if (this.isNullOrWhiteSpace(field)) {
      return value;
    }
    const divisor = field.split(';');

    if (divisor.length > 1) {
      let retorno: string = '';
      divisor.forEach((elementPrincipal) => {
        const fields = (elementPrincipal as string).split('.');
        if (fields.length > 1) {
          let novoItem = value;
          fields.forEach((element) => {
            novoItem = novoItem[element];
          });
          retorno = retorno + this.getEspaco(retorno) + novoItem.toString();
        } else {
          retorno =
            retorno +
            this.getEspaco(retorno) +
            (elementPrincipal
              ? value[elementPrincipal].toString()
              : value.toString());
        }
      });
      return retorno;
    } else {
      const fields = ((field
        ? field
        : value.toString()) as string).split('.');
      if (fields.length > 1) {
        let novoItem = value;
        fields.forEach((element) => {
          novoItem = novoItem[element];
        });
        return novoItem.toString();
      }
      return field ? value[field] : value.toString();
    }
  }
  getEspaco(value: string): string {
    return this.isNullOrWhiteSpace(value) ? '' : ' - ';
  }

  async mensagemErroFoca(msg: string, funcao: any, paramentro: string) {
    //     msg =  msg.replace('\n', '</br>');
    //    msg =  msg.replace('#13#10', '</br>');
    if (this.isLoading) {
      this.dismiss();
    }
    msg = msg.split('\n').join('</br>');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-erro',
      header: 'Erro',
      message: '<strong style=\'color = black;\'>' + msg + ' </strong>',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
      ],
    });
    await alert.present();
    const { data } = await alert.onWillDismiss();
    console.log(data);
    funcao(paramentro);
  }


  async mensagemAlerta(msg: string) {
    msg = msg.split('\n').join('</br>');
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  async mensagemAviso(msg: string, titulo?: string) {
    msg = msg.split('\n').join('</br>');
    const alert = await this.alertCtrl.create({
      header: titulo ? titulo : 'Atenção',
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  async present(msg?: string) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: msg ? msg : 'Carregando...',
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {});
  }

  async presentAlertConfirm(funcao, valor, isto, msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirme!',
      message: 'Messagem: <strong>' + msg + '</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            funcao(valor, isto);
          },
        },
      ],
    });

    await alert.present();
  }
  async Confirma(msg: string, funcao, paramentro?: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirme!',
      message: 'Messagem: <strong>' + msg + '</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            return false;
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (paramentro !== undefined) {
              funcao(paramentro);
            } else {
              funcao();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  tratarErro(value: any) {
    console.log(value);
    if (value.error === undefined) {
      return value.toString();
    }

    if (
      value.error.mensagemUsuario !== undefined &&
      value.error.mensagemUsuario !== null
    ) {
      return value.error.mensagemUsuario;
    } else {
      if (
        value.error.error_description !== undefined &&
        value.error.error_description !== null
      ) {
        return value.error.error_description;
      } else {
        if (
          value.error instanceof Blob &&
          value.error.type === 'application/json'
        ) {
          return 'Nenhum dado encontrado';
        } else {
          return value.error.toString();
        }
      }
    }
  }

  menssagemSucesso(msg: string) {
    this.toast
      .create({
        message: msg,
        duration: 5000,
        position: 'middle',
        //  closeButtonText: 'Yeah',
        animated: true,
        cssClass: 'my-custom-class-sucesso',
      })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
  }

  abrirPDF(data: any, nome: string) {
    nome = nome + '.pdf';
    if (this.platform.is('android')) {
      const filePath = this.file.externalRootDirectory;

      // Write the file
      this.file
        .writeFile(filePath, nome, data, { replace: true })
        .then(() => {
          this.opener.open(filePath + nome, 'application/pdf').catch(() => {
            console.log('Error opening pdf file');
          });
        })
        .catch(() => {
          console.error('Error writing pdf file');
        });
    } else {
      this.save(data, nome);
    }
  }

  save(blob, fileName) {
    FileSaver.saveAs(blob, fileName);
  }

  vazio(value: string) {
    return value === undefined || value === null || value === '';
  }
  async atualizarSenha(usuario: Usuario) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-dialog',
      header: ' Alteração de Senha ',
      subHeader: 'Usuário: ' + usuario.login,
      backdropDismiss: false,
      inputs: [
        {
          name: 'senhaAntiga',
          type: 'password',
          placeholder: 'Senha antiga',
          min: -5,
          max: 10,
        },
        {
          name: 'novaSenha',
          type: 'password',
          placeholder: 'Nova senha',
          min: -5,
          max: 10,
        },
        {
          name: 'confirmacaoSenha',
          type: 'password',
          placeholder: 'Repita nova senha',
          min: -5,
          max: 10,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log(data);
            if (this.as.deveAtualizarSenha) {
              this.mensagemErro('Usuario Deve Atualizar Senha !');
              this.as.logout();
              this.router.navigate(['login']);
            }
          },
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (
              data.novaSenha === undefined ||
              data.novaSenha === null ||
              data.novaSenha === ''
            ) {
              this.mensagemErro('Senha em branco');
              return false;
            }
            if (data.novaSenha !== data.confirmacaoSenha) {
              this.mensagemErro('Senhas dever ser iguais');
              return false;
            }
            this.present('Atualizando Senha');
            const msgErro = 'Erro ao atualizar senha :';
            usuario.senha = data.senhaAntiga;
            this.us.confirmaSenha(usuario).subscribe(
              (retorno) => {
                console.log(retorno);
                usuario.senha = data.novaSenha;
                this.us.salvarSoUsuario(usuario).subscribe(
                  () => {
                    this.dismiss();
                    this.as.deveAtualizarSenha = false;
                    this.mensagemAlerta('Senha alterada com sucesso');
                  },
                  (error) => {
                    this.dismiss();
                    this.mensagemErro(msgErro + this.tratarErro(error));
                    return false;
                  }
                );
              },
              (error) => {
                this.mensagemErro(msgErro + this.tratarErro(error));
                this.dismiss();
                return false;
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async esqueceuSenha() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-dialog',
      header: ' Esqueceu Senha ',
      backdropDismiss: false,
      inputs: [
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF do usuário',
          min: -5,
          max: 10,
        },
        {
          name: 'novaSenha',
          type: 'password',
          placeholder: 'Nova senha',
          min: -5,
          max: 10,
        },
        {
          name: 'confirmacaoSenha',
          type: 'password',
          placeholder: 'Repita nova senha',
          min: -5,
          max: 10,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log(data);
            if (this.as.deveAtualizarSenha) {
              this.mensagemErro('Usuário Deve Atualizar Senha !');
              this.as.logout();
              this.router.navigate(['login']);
            }
          },
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (
              data.cpf === undefined ||
              data.cpf === null ||
              data.cpf === ''
            ) {
              this.mensagemErro('CPF branco');
              return false;
            }
            if (
              data.novaSenha === undefined ||
              data.novaSenha === null ||
              data.novaSenha === ''
            ) {
              this.mensagemErro('Senha em branco ');
              return false;
            }
            if (data.novaSenha !== data.confirmacaoSenha) {
              this.mensagemErro('Senhas dever ser iguais');
              return false;
            }
            this.present('Atualizando Senha');
            const msgErro = 'Erro ao atualizar senha :';
            const usuario: Usuario = new Usuario();
            usuario.pessoaJuridica = new PessoaJuridica();
            usuario.pessoaJuridica.cnpj = data.cpf;
            usuario.senha = data.novaSenha;
            this.as.getNewTokenRegisto().subscribe(
              (parameter) => {
                this.as.token = parameter as Token;
                this.us.esqueceuSenha(usuario).subscribe(
                  () => {
                    this.menssagemSucesso('Senha altera com sucesso');
                    this.dismiss();
                    this.as.token = null;
                  },
                  (error) => {
                    this.mensagemErro(msgErro + this.tratarErro(error));
                    this.dismiss();
                    this.as.token = null;
                    return false;
                  }
                );
              },
              (error) => {
                this.dismiss();
                this.as.token = null;
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }



  isAdiministrador() {}

  //getEmpresa(): Empresa {
  //  return this.as.token.empresa;
  //}

  getUsuarioToken(): Usuario {
    return this.as.token.usuario;
  }


  /*  GUARDAR PARA USAR NO FUTURO
 async atualizarSenha(usuario: Usuario) {

        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Prompt!',
            inputs: [
              {
                name: 'name1',
                type: 'text',
                placeholder: 'Placeholder 1'
              },
              {
                name: 'name2',
                type: 'text',
                id: 'name2-id',
                value: 'hello',
                placeholder: 'Placeholder 2'
              },
              // multiline input.
              {
                name: 'paragraph',
                id: 'paragraph',
                type: 'textarea',
                placeholder: 'Placeholder 3'
              },
              {
                name: 'name3',
                value: 'http://ionicframework.com',
                type: 'url',
                placeholder: 'Favorite site ever'
              },
              // input date with min & max
              {
                name: 'name4',
                type: 'date',
                min: '2017-03-01',
                max: '2018-01-12'
              },
              // input date without min nor max
              {
                name: 'name5',
                type: 'date'
              },
              {
                name: 'name6',
                type: 'number',
                min: -5,
                max: 10
              },
              {
                name: 'name7',
                type: 'number'
              },
              {
                name: 'name8',
                type: 'password',
                placeholder: 'Advanced Attributes'
              }
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              }, {
                text: 'Ok',
                handler: () => {
                  console.log('Confirm Ok');
                }
              }
            ]
          });

          await alert.present();

    }
    */
}
