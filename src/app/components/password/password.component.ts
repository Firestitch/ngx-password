import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgControl, Validator } from '@angular/forms';

import { fromEvent, merge, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { PasswordMeter } from 'password-meter';

import { IFsPasswordStrengthConfig } from '../../interfaces/password-strength-config.interface';


@Component({
  selector: '[fsPassword]',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FsPasswordComponent,
    multi: true,
  }],
})
export class FsPasswordComponent implements AfterViewInit, OnInit, OnDestroy, Validator {

  @Input() public visible = false;
  @Input() public strength = false;
  @Input() public defaultPasswordHint: string;
  @Input() public strengthConfig: IFsPasswordStrengthConfig;

  public visibleToggle;
  public passwordMeter: PasswordMeter;
  public passwordMeterLevel: 'weak' | 'medium' | 'strong';
  public acceptable = false;
  public passwordHint = '';

  private _destroy$ = new Subject();
  private _ngControl: NgControl;
  private _matFormField;

  constructor(
    private _el: ElementRef,
    private _injector: Injector,
  ) {
  }

  public get element() {
    return this._el.nativeElement;
  }

  public toggle(e): void {
    e.preventDefault();
    e.stopPropagation();

    this.visibleToggle = !this.visibleToggle;
    this.updateType();
  }

  public updateType(): void {
    this._el.nativeElement.setAttribute('type', this.visibleToggle ? 'text' : 'password');
  }

  public ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl);

    if(this.strength) {
      this.strengthConfig = {
        minLength: 8,
        ...this.strengthConfig,
      };
      this.passwordMeter = new PasswordMeter(this.strengthConfig);
    }
    
    this.defaultPasswordHint = this.defaultPasswordHint === undefined ? 
      this.minLengthPasswordHint :
      this.defaultPasswordHint;
    this.visibleToggle = this.visible;
    this.updateType();

    // Used to fix iOS chrome autofill issue
    // https://github.com/angular/components/issues/3414
    merge(
      fromEvent(this.element, 'change'),
    )
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe((event: any) => {
        this._ngControl.control.setValue(event.target.value);
      });
  }

  public validate(control: AbstractControl): { [key: string]: any } | null {
    if(!this.strength) {
      return null;
    }

    const value = control.value || '';
    const result = this.passwordMeter.getResult(value);
    this.acceptable = result.percent >= 60;

    let prefix = '';
    this.passwordMeterLevel = null;
    if(control.dirty) {
      if(this.acceptable) {
        this.passwordMeterLevel = 'strong';
        this.passwordHint = 'Your password is strong';

        if(result.percent >= 90) {
          this.passwordHint = 'Amazing! Your password is very strong';
        }
      } else if(result.percent >= 40) {
        prefix = 'Could be stronger';
        this.passwordMeterLevel = 'medium';
      } else {
        prefix = 'Too weak';
        this.passwordMeterLevel = 'weak';
      }
    }

    this._updateFormField();

    if(this.acceptable) {
      return null;
    }

    if(value.length === 0) {
      this.passwordHint = this.defaultPasswordHint;
    } else if(!value.match(/\W/)) {
      this.passwordHint = `${prefix}, try including a special character`;
    } else if(!value.match(/[A-Z]/)) {
      this.passwordHint = `${prefix}, try including an uppercase character`;
    } else if(value.length < this.strengthConfig.minLength) {
      this.passwordHint = this.minLengthPasswordHint;
    } else {
      this.passwordHint = `${prefix}, try adding another word or two`;
    }

    return { passwordStrength: this.passwordHint };
  }

  public get matFormField(): Element {
    if(this._matFormField) {
      return this._matFormField;
    }

    let el = this._el.nativeElement;
    while (el.parentNode) {
      el = el.parentNode;
      
      if (el?.classList.contains('mat-mdc-form-field')) {
        this._matFormField = el;

        return el;
      }
    }

    return null;
  }

  public ngAfterViewInit(): void {
    const matFormFieldFlex = this.matFormField.querySelector('.mat-mdc-form-field-flex');
    this.matFormField.classList.add('form-field-multiline-subscript');

    if(this.strength) {
      const matUnderline = this.matFormField.querySelector('.mat-mdc-form-field-subscript-wrapper');

      if(matUnderline) {
        matUnderline
          .prepend(this._el.nativeElement.querySelector('.fs-password-meter'));
      }

      const matHintWrapper = this.matFormField.querySelector('.mat-mdc-form-field-hint-wrapper');
      matHintWrapper.prepend(this._el.nativeElement.querySelector('.fs-password-hint'));
    }

    matFormFieldFlex
      .append(this._el.nativeElement.querySelector('.fs-password-toggle'));
  }

  public get minLengthPasswordHint(): string {
    return this.strengthConfig.minLength ? 
      `Make sure it's ${String(this.strengthConfig.minLength)} characters or more` : 
      '';
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _updateFormField(): void {
    this.matFormField.classList.remove('password-weak');
    this.matFormField.classList.remove('password-medium');
    this.matFormField.classList.remove('password-strong');

    if(this.passwordMeterLevel === 'weak') {
      this.matFormField.classList.add('password-weak');
    }

    if(this.passwordMeterLevel === 'medium') {
      this.matFormField.classList.add('password-medium');
    }

    if(this.passwordMeterLevel === 'strong') {
      this.matFormField.classList.add('password-strong');
    }
  }

}
