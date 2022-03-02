import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base } from '../../../../model/base';

const noop = () => {
};
@Component({
  selector: 'mask-mbi',
  templateUrl: './mask-mbi.component.html',
  styleUrls: ['./mask-mbi.component.scss'],
  providers: [MakeProvider(MaskMbiComponent)]
})
export class MaskMbiComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = 'item sem label';
  @Input() name: string;
  @Input() innerValue;
  @Input() type = 'text';
  @Input() mask = {type: 'all', userCaracters: true};
  @Input() isRequired = false;
  passou: boolean = false;
  constructor(
    private base: Base
  ) { }

  ngOnInit() {}

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
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

  }

  exibirMensagem(): boolean {
    return this.passou && !this.value && this.isRequired;
  }

  saiu(evento: any): void {
    this.passou = true;
  }

  getStyle() {
    return this.exibirMensagem() ?  '2px solid red' : '';
  }

}


export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
