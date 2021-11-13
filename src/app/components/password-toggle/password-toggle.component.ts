import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Injector
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: '[fsPassword]',
  templateUrl: 'password-toggle.component.html',
  styleUrls: [ 'password-toggle.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this._ngControl = this._injector.get(NgControl);
    this.visibleToggle = this.visible;
    this.updateType();

    fromEvent(this.element, 'blur')
    .pipe(
      takeUntil(this._destroy$),
    )
    .subscribe((event: any) => {
      if(event.target.value) {
        this._ngControl.viewToModelUpdate(event.target.value);
      }
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
