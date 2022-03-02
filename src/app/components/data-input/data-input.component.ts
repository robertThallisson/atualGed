import { Component, OnInit, forwardRef, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DataModalPage } from './data-modal/data-modal.page';
import { Base } from '../../model/base';

const noop = () => {
};
@Component({
  selector: 'data-mbi',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss'],
  providers: [MakeProvider(DataInputComponent)]
})
export class DataInputComponent implements ControlValueAccessor, OnInit {

  @Input() innerValue: any = new Date();
  @Input() isReadOnly;
  @Input() mask: string = 'DD/MM/YYYY HH:mm';
  @Input() retroativa: boolean = true;
  @Input() apenasData: boolean;
  @Input() name: string = 'name';
  @Output() inputValueChange = new EventEmitter<any>();
  @Output() ionChangeChange = new EventEmitter<any>();
  @Output() ionExit = new EventEmitter<any>();

  @ViewChild('texto', { static: true }) texto: any;

  constructor(
    public modalController: ModalController,
    public base: Base
  ) {

  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
  //  if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    //}
  }

  //Set touched on blur
  onBlur(event: any ) {
    this.onTouchedCallback();
    if (this.apenasData) {
      if (!this.base.isValidDate(this.innerValue)) {
        this.innerValue = null;
      }
    } else {
      if (!this.base.isValidDateHora(this.innerValue)) {
        this.innerValue = null;
      }
    }

    this.ionExit.emit({item: this.innerValue});
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
  ngOnInit() {
    if (this.apenasData) {
      this.mask = 'DD/MM/YYYY';
    }
    this.value = this.mask.length > 10 ? this.base.formatS(new Date()) : this.base.formateDataNoTime(new Date());
  }

  async onChange(event: any) {
    this.ionChangeChange.emit(event);
    if (event.detail.value === '') {
      this.value = undefined;
    }
    if (this.apenasData) {
      if (this.base.isValidDate(event.detail.value)) {
        this.value = event.detail.value;
      }
    } else {
      if (this.base.isValidDateHora(event.detail.value)) {
        this.value = event.detail.value;
      }
    }
  }

  async buscarData() {
    const modal = await this.modalController.create({
      component: DataModalPage,
      cssClass: 'my-custom-class-modal-data',
      componentProps: {
        value: this.innerValue,
        mask: this.mask,
        retroativa: this.retroativa
      }
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    if ( this.base.isNullOrWhiteSpace(data) || this.base.isNullOrWhiteSpace(data.value)  ) {
      this.value = null;
    } else {
      this.value = data.value;
    }

  }

  keyDownData(event: any) {
    const data = new Date();
    const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
    const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    if (event.key === 'H' || event.key === 'h') {
      this.value = this.getDataFormatada(data);
    }
    if (event.key === 'O' || event.key === 'o') {
      data.setDate(data.getDate() - 1);
      this.value = this.getDataFormatada(data);
    }
    if (event.key === 'A' || event.key === 'a') {
      data.setDate(data.getDate() + 1);
      this.value = this.getDataFormatada(data);
    }
    if (event.key === 'I' || event.key === 'i') {
      this.value = this.getDataFormatada(primeiroDia);
    }

    if (event.key === 'F' || event.key === 'f') {
      this.value = this.getDataFormatada(ultimoDia);
    }
  }

  getDataFormatada(data: Date) {
    return this.apenasData ? this.base.formateDataNoTime(data) : this.base.formatS(data);
  }

  focusFunction(event: any) {
    this.texto.setFocus();
  }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
