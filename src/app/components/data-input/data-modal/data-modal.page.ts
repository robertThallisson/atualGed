import { Base } from './../../../model/base';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.page.html',
  styleUrls: ['./data-modal.page.scss'],
})
export class DataModalPage implements OnInit {

  type: 'string';
  hora: string;

  @Input() value: any = new Date();
  @Input() mask: string;
  @Input() retroativa: boolean = true;

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'single'
  };
  constructor(public modalController: ModalController, private base: Base) { }

  ngOnInit() {
    this.optionsMulti = {
      pickMode: 'single',
      from: this.retroativa ? new Date(2000, 0, 1) : new Date()
    };

    if (this.temHora()) {
      this.hora = '00:00';
    }
  }

  ok() {
    if (this.base.isNullOrWhiteSpace(this.value)) {
      this.value =  moment(new Date());
    }
    let retorno =  this.value.format('DD/MM/YYYY');
    retorno = retorno  + (this.base.isNullOrWhiteSpace(this.hora) ? '' : (' ' + this.hora));
    if (this.temHora() && !this.base.isValidDateHora(retorno)) {
      this.base.mensagemErro('Selecione uma data e hora válida');
      return;
    }

    this.close(
      {
        value: retorno
      }
    );

   
  }
  closeAny(){
    this.close(null);
  }
  close(obj: any) {
    this.modalController.dismiss(obj);
  }

  keyDown(event: any) {
    const data = new Date();
    const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
    const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    if (event.key === 'H' || event.key === 'h') {
        this.value = data;
    }
    if (event.key === 'O' || event.key === 'o') {
        data.setDate(data.getDate() + 1);
        this.value = data;
    }
    if (event.key === 'A' || event.key === 'a') {
        data.setDate(data.getDate() - 1);
        this.value = data;
    }
    if (event.key === 'I' || event.key === 'i') {
      this.value = primeiroDia;
    }

    if (event.key === 'F' || event.key === 'f') {
      this.value = ultimoDia;
    }
  }

  temHora() {
    return (!this.base.isNullOrWhiteSpace(this.mask)) && this.mask.includes('HH:mm');
  }
}
