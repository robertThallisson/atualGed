import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base } from '../../../../model/base';
import { isNullOrWhiteSpace } from '../../../../funcoes/funcoes';

const noop = () => {};
@Component({
  selector: 'currency-mbi',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  providers: [MakeProvidert(CurrencyInputComponent)],
})
export class CurrencyInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'item sem label';
  @Input() name: string;
  @Input() innerValue;

  @Input() readonly: boolean = false;

  @Output() ionChange = new EventEmitter<any>();
  valor: any;

  mask: any = {money: true};
  @Input() inteiro: boolean = false;
  @Input() isRequired = false;
  passou: boolean = false;

  @Input() maxValue;
  
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor(private base: Base) {}

  ngOnInit() {
    if (this.inteiro) {
      this.mask = {type: 'num'};
    }
  }
  get value(): any {
    return this.innerValue;
  }


  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (this.base.isNullOrWhiteSpace(value) ) {
      this.value = 0;
      this.valor = '';
    } else {
      if (isNaN(value)) {
        this.valor = '';
      } else {
        if (this.inteiro) {
          // eslint-disable-next-line radix
          this.valor = parseInt(value);
        } else {
          this.valor = this.base.toMoney(value);
        }

      }
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  onChange(event: any) {
    console.log(event);
    this.value = this.base.toNumber(event.detail.value);
    this.ionChange.emit(event);
  }

  exibirMensagem(): boolean {
    return this.passou && !this.value && this.isRequired;
  }

  saiu(evento: any): void {
    this.passou = true;

    if (!isNullOrWhiteSpace(this.maxValue) && (this.value >  Number(this.maxValue)) ) {
      this.value = Number(this.maxValue);
      this.valor = this.base.toMoney(Number(this.maxValue));
    }
  }

  getStyle() {
    return this.exibirMensagem() ?  '2px solid red' : '';
  }
}

export function MakeProvidert(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
