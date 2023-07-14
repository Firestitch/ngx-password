import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  Injector,
  ChangeDetectorRef,
} from '@angular/core';
import { AbstractControl, NgControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, filter, take, takeUntil } from 'rxjs/operators';

import { IFsPasswordStrengthConfig } from '../../interfaces/password-strength-config.interface';

import { PasswordMeter } from 'password-meter'; 


@Component({
  selector: '[fsPassword]',
  templateUrl: 'password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FsPasswordComponent,
    multi: true
 }]  
})
export class FsPasswordComponent implements AfterViewInit, OnInit, OnDestroy, Validator {

  @Input() public visible = false;
  @Input() public strength = false;
  @Input() public strengthConfig: IFsPasswordStrengthConfig;

  public visibleToggle;
  public passwordMeter: PasswordMeter;
  public passwordMeterLevel: 'weak' | 'medium' | 'strong';
  public acceptable = false;
  public passwordHint = '';

  private _destroy$ = new Subject();
  private _ngControl: NgControl;

  constructor(
    private _el: ElementRef,
    private _injector: Injector,
    private _cdRef: ChangeDetectorRef,
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
        ...this.strengthConfig
      }; 
      this.passwordMeter = new PasswordMeter(this.strengthConfig);
    }

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
      this.passwordHint = this.defaultPasswordHint;
    } else {              
      this.passwordHint = `${prefix}, try adding another word or two`;
    }

    return { passwordStrength: this.passwordHint };
  }

  public ngAfterViewInit(): void {
    const matFormField = this._el.nativeElement.parentElement.parentElement.parentElement.parentElement;
    const matFormFieldFlex = matFormField.querySelector('.mat-form-field-flex');

    matFormFieldFlex
      .appendChild(this._el.nativeElement.querySelector('.fs-password-toggle'));

    if(this.strength) {
      //matFormField.classList.add('form-field-multiline-subscript');
      const matUnderline = matFormFieldFlex.parentElement.querySelector('.mat-form-field-underline');

      matUnderline
      .after(this._el.nativeElement.querySelector('.fs-password-meter'));  

      const matHintWrapper = matFormFieldFlex.parentElement.querySelector('.mat-form-field-hint-wrapper');
      matHintWrapper.prepend(this._el.nativeElement.querySelector('.fs-password-hint'));
    }
  }

  public get defaultPasswordHint(): string {
    return `Make sure it’s ${this.strengthConfig.minLength} characters or more`;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
