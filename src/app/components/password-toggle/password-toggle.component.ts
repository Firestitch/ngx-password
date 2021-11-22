import { AutofillEvent, AutofillMonitor } from '@angular/cdk/text-field';
import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Injector,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { filter, subscribeOn, takeUntil } from 'rxjs/operators';


@Component({
  selector: '[fsPassword]',
  templateUrl: 'password-toggle.component.html',
  styleUrls: [ 'password-toggle.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgModel],
})
export class FsPasswordToggleComponent implements AfterViewInit, OnInit {

  @Input()
  public visible = false;

  public visibleToggle;

  private _ngControl: NgControl;
  private _destroy$ = new Subject();

  constructor(
    private el: ElementRef,
    private _injector: Injector,
    private _autofill: AutofillMonitor,
    private _zone: NgZone,
    private _cdRef: ChangeDetectorRef,
    private _ngModel: NgModel,
  ) { }

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

  public ngOnInit(): void {
    this._autofill.monitor(this.element)
    .subscribe((event: AutofillEvent) => {
        alert(event);
    });

    this._ngControl = this._injector.get(NgControl);
    this.visibleToggle = this.visible;
    this.updateType();

    // Used to fix iOS chrome autofill issue
    // https://github.com/angular/components/issues/3414
    fromEvent(this.element, 'change')
    .pipe(
      filter((event: any) => (!!event.target.value)),
      takeUntil(this._destroy$),
    )
    .subscribe((event: any) => {
      this._ngModel.control.setValue(event.target.value);
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
