import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';


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
  ],
})
export class FsPasswordToggleComponent implements AfterViewInit, OnInit, ControlValueAccessor {

  @Input()
  public visible = false;

  public visibleToggle;

  private _destroy$ = new Subject();

  private _onChange;
  private _onTouch;

  constructor(
    private el: ElementRef,
  ) { }

  public registerOnChange(fn: any) {
    this._onChange = fn;
  }

  public registerOnTouched (fn: any) {  }

  public get element() {
    return this.el.nativeElement;
  }

  public toggle(e): void {
    e.preventDefault();
    e.stopPropagation();

    this.visibleToggle = !this.visibleToggle;
    this.updateType();
  }

  public updateType(): void {
    this.el.nativeElement.setAttribute('type', this.visibleToggle ? 'text' : 'password');
  }

  public writeValue(value) {}

  public ngOnInit(): void {
    this.visibleToggle = this.visible;
    this.updateType();

    // Used to fix iOS chrome autofill issue
    // https://github.com/angular/components/issues/3414
    fromEvent(this.element, 'change')
      .pipe(
        filter((event: any) => (!!event.target.value)),
        delay(50),
        takeUntil(this._destroy$),
      )
      .subscribe((event: any) => {
        this._onChange(event.target.value);
      });
  }

  public ngAfterViewInit(): void {
    this.el.nativeElement.parentElement.parentElement
      .appendChild(this.el.nativeElement.querySelector('.fs-password-toggle'));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
