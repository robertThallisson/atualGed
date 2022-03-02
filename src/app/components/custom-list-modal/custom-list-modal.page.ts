import { Base } from './../../model/base';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'custom-list-modal',
  templateUrl: './custom-list-modal.page.html',
  styleUrls: ['./custom-list-modal.page.scss'],
})
export class CustomListModalPage implements OnInit {
  value: string;

  service: any;

  metodo: any;

  itens = [];

  @Input() minLenght = 0;
  // obrigatorios

  @Input() itemValueField = 'id';

  @Input() itemTextField = 'nome';
  @Input() isMultiple: boolean = false;
  @Input() ngModel: any;
  @ViewChild('pesquisa', { static: true }) myInput: IonInput;
  @Input() searchFull = false;
  @Input() args: any;

  constructor(public modalController: ModalController, private base: Base) {}

  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }
  ionViewWillEnter() {
    this.myInput.setFocus();
    setTimeout(() => {
      this.myInput.setFocus();
    }, 500);
  }

  pesquisar() {
    this.base.present();
    console.log(this.service);
    let pesquisa =
      this.base.isNullOrWhiteSpace(this.value) && this.searchFull
        ? ' '
        : this.value;
    if (this.base.isNullOrWhiteSpace(this.metodo)) {
      this.service.pesquisar(pesquisa).subscribe(
        (data) => {
          this.itens = data as any;
          this.base.dismiss();
        },
        (erro) => {
          console.log(erro);
          this.base.dismiss();
        }
      );
    } else {
      pesquisa =
        this.base.isNullOrWhiteSpace(pesquisa) &&
        !this.base.isNullOrWhiteSpace(this.args)
          ? ' '
          : this.value;
      if (!this.base.isNullOrWhiteSpace(this.args)) {
        this.metodo(this.args, pesquisa).subscribe(
          (data) => {
            this.itens = data as any;
            this.base.dismiss();
          },
          (erro) => {
            console.log(erro);
            this.base.dismiss();
          }
        );
      } else {
        if (this.base.isNullOrWhiteSpace(pesquisa) && this.searchFull) {
          pesquisa = ' ';
        }
        this.metodo(pesquisa).subscribe(
          (data) => {
            this.itens = data as any;
            this.base.dismiss();
          },
          (erro) => {
            console.log(erro);
            this.base.dismiss();
          }
        );
      }
    }
  }

  possuemItens() {
    try {
      return this.itens.length > 0;
    } catch (error) {
      return false;
    }
  }

  getEspaco(value: string): string {
    return this.base.isNullOrWhiteSpace(value) ? '' : ' - ';
  }

  getNome(item?: any) {
    if (this.base.isNullOrWhiteSpace(item)) {
      item = this.ngModel;
    }
    if (this.base.isNullOrWhiteSpace(item)) {
      return '';
    }
    const divisor = ((this.itemTextField
      ? this.itemTextField
      : item.toString()) as string).split(';');

    if (divisor.length > 1) {
      let retorno: string = '';
      divisor.forEach((elementPrincipal) => {
        const fields = (elementPrincipal as string).split('.');
        if (fields.length > 1) {
          let novoItem = item;
          fields.forEach((element) => {
            novoItem = novoItem[element];
          });
          retorno = retorno + this.getEspaco(retorno) + novoItem.toString();
        } else {
          retorno =
            retorno +
            this.getEspaco(retorno) +
            (elementPrincipal
              ? item[elementPrincipal].toString()
              : item.toString());
        }
      });
      return retorno;
    } else {
      const fields = ((this.itemTextField
        ? this.itemTextField
        : item.toString()) as string).split('.');
      if (fields.length > 1) {
        let novoItem = item;
        fields.forEach((element) => {
          novoItem = novoItem[element];
        });
        return novoItem.toString();
      }
      return this.itemTextField ? item[this.itemTextField] : item.toString();
    }
  }

  getNomeByText(item: any, textField: []) {}

  keyDown(event: any) {
    if (event.keyCode === 13) {
      this.pesquisar();
    }

    if (event.keyCode === 27) {
      this.closeAny();
    }
  }

  selecionar(item: any) {
    if (this.isMultiple) {
      if (this.base.isNullOrWhiteSpace(this.ngModel)) {
        this.ngModel = [];
        this.ngModel.push(item);
      } else {
        let remove = -1;

        for (let i = 0; i < this.ngModel.length; i++) {
          const value = this.ngModel[i];
          if (value[this.itemValueField] === item[this.itemValueField]) {
            remove = i;
          }
        }

        if (remove === -1) {
          this.ngModel.push(item);
        } else {
          this.ngModel.splice(remove, 1);
        }
      }
    } else {
      this.ngModel = item;
      this.ok();
    }
  }

  ok() {
    this.close({
      dismissed: true,
      itemValueField: this.itemValueField,
      itemTextField: this.itemTextField,
      isMultiple: this.isMultiple,
      minLenght: this.minLenght,
      ngModel: this.ngModel,
    });
  }

  estaSelecionavel(item: any): boolean {
    if (this.base.isNullOrWhiteSpace(this.ngModel)) {
      return false;
    }

    if (!this.isMultiple) {
      return item[this.itemValueField] === this.ngModel[this.itemValueField];
    }
    let retorno = false;
    this.ngModel.forEach((element) => {
      if (item[this.itemValueField] === element[this.itemValueField]) {
        retorno = true;
        return true;
      }
    });

    return retorno;
  }

  closeAny() {
    this.close({
      dismissed: true,
      itemValueField: this.itemValueField,
      itemTextField: this.itemTextField,
      isMultiple: this.isMultiple,
      minLenght: this.minLenght,
      ngModel: this.isMultiple ? [] : {},
    });
  }
  close(obj: any) {
    this.modalController.dismiss(obj);
  }

  clean() {
    if (this.isMultiple) {
      this.ngModel = [];
    } else {
      this.ngModel = {};
    }
  }
}
