import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  OnDestroy,
  ChangeDetectorRef,
  Optional,
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NgControl, NgForm, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, delay, takeUntil, tap } from 'rxjs/operators';

import { IResult, PasswordMeter } from 'password-meter'; 
import { controlContainerFactory } from '../password/password.component';


@Component({
  selector: '[fsPassword]',
  templateUrl: 'password-toggle.component.html',
  styleUrls: ['password-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsPasswordToggleComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsPasswordToggleComponent),
      multi: true,
    },
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]]
    }
  ],  
})
export class FsPasswordToggleComponent implements AfterViewInit, OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() public visible = false;
  @Input() public meter = false;

  public visibleToggle;
  public passwordMeter: PasswordMeter;
  public passwordMeterResult: { level: 'weak' | 'medium' | 'strong' };
  public acceptable = false;
  public passwordHint;

  private _destroy$ = new Subject();
  private _onChange;
  private _onTouch;

  constructor(
    private _el: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _ngForm : NgForm
  ) {
   }

  public registerOnChange(fn: any) {
    this._onChange = fn;
  }

  public registerOnTouched (fn: any) {  }

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

  public writeValue(value) {}

  public validate(control: AbstractControl): { [key: string]: any } | null { 
    if(this.meter) {
      // if(!this.passwordMeterResult || this.passwordMeterResult.level !== 'strong') {
      //   return { strength: 'Please provide an acceptable password' };
      // }
    }

    return null;  
  }

  public ngOnInit(): void {
    if(this.meter) {
      this.passwordMeter = new PasswordMeter();
    }

    this.visibleToggle = this.visible;
    this.updateType();

    // Used to fix iOS chrome autofill issue
    // https://github.com/angular/components/issues/3414
    fromEvent(this.element, 'input')
      .pipe(
        debounceTime(50),
        tap((event: any) => {
          const value = event.target.value;        
          if(this.meter) {          
            const result = this.passwordMeter.getResult(value);
            let level = null;
            this.acceptable = result.percent >= 60;
  
            if(this.acceptable) {
              level = 'strong';
            } else if(result.percent >= 40) {
              level = 'medium';
            } else {
              level = 'weak';
            }
            
            this.passwordHint = null;
            if(!this.acceptable) {
              if(!value.match(/\W/)) {
                this.passwordHint = 'Try including a special character';
              } else if(!value.match(/[A-Z]/)) {
                this.passwordHint = 'Try including an uppercase character';
              } else {
                this.passwordHint = 'Try adding another word or two';
              }
            }
  
            this.passwordMeterResult = {
              level,
            }
  
            this._cdRef.markForCheck();
          }
          
          this._onChange(event.target.value);
        }),
        delay(100),
        takeUntil(this._destroy$),
      )
      .subscribe((event: any) => {
        this._ngForm.controls.password.markAsPristine();
      });
  }

  public ngAfterViewInit(): void {
    const matFormFieldFlex = this._el.nativeElement.parentElement.parentElement;

    matFormFieldFlex
      .appendChild(this._el.nativeElement.querySelector('.fs-password-toggle'));

    if(this.meter) {
      const matUnderline = matFormFieldFlex.parentElement.querySelector('.mat-form-field-underline');

      matUnderline
      .after(this._el.nativeElement.querySelector('.fs-password-meter'));  

      const matHintWrapper = matFormFieldFlex.parentElement.querySelector('.mat-form-field-hint-wrapper');
      matHintWrapper.prepend(this._el.nativeElement.querySelector('.fs-password-hint'));
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
