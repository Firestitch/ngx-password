import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { IRequirement, PasswordMeter } from 'password-meter'; 


@Component({
  selector: '[fsPassword]',
  templateUrl: 'password-toggle.component.html',
  styleUrls: ['password-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPasswordToggleComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input() public visible = false;
  @Input() public strength = false;
  @Input() public strengthConfig: IRequirement;

  public visibleToggle;
  public passwordMeter: PasswordMeter;
  public passwordMeterResult: { level: 'weak' | 'medium' | 'strong' };
  public acceptable = false;
  public passwordHint = '';

  private _destroy$ = new Subject();

  constructor(
    private _el: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _ngControl: NgControl,
  ) {}

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
    if(this.strength) {
      this.strengthConfig = {
        minLength: 8,
        ...this.strengthConfig
      }; 
      this.passwordMeter = new PasswordMeter(this.strengthConfig);
      this.passwordHint = this.defaultPasswordHint;    
    }

    this.visibleToggle = this.visible;
    this.updateType();

    // Used to fix iOS chrome autofill issue
    // https://github.com/angular/components/issues/3414
    fromEvent(this.element, 'change')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: any) => {
        this._ngControl.viewToModelUpdate(event.target.value)
      });

    fromEvent(this.element, 'input')
      .pipe(
        debounceTime(50),
        takeUntil(this._destroy$),
      )
      .subscribe((event: any) => {
        const value = event.target.value;        
        if(this.strength) {
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
                      
          if(this.acceptable) {
            this.passwordHint = '';
          } else {
            if(!value.match(/\W/)) {
              this.passwordHint = 'Try including a special character';
            } else if(!value.match(/[A-Z]/)) {
              this.passwordHint = 'Try including an uppercase character';
            } else if(value.length < this.strengthConfig.minLength) {
              this.passwordHint = this.defaultPasswordHint;
            } else {              
              this.passwordHint = 'Try adding another word or two';
            }
          }

          this.passwordMeterResult = {
            level,
          }

          this._cdRef.markForCheck();
        }
        
        this._ngControl.viewToModelUpdate(event.target.value);
      });
  }

  public ngAfterViewInit(): void {
    const matFormField = this._el.nativeElement.parentElement.parentElement.parentElement.parentElement;
    const matFormFieldFlex = matFormField.querySelector('.mat-form-field-flex');

    matFormFieldFlex
      .appendChild(this._el.nativeElement.querySelector('.fs-password-toggle'));

    if(this.strength) {
      matFormField.classList.add('form-field-multiline-subscript');
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
