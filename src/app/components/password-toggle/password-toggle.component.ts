import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';


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

  constructor(private el: ElementRef) { }

  public get element() {
    return this.el.nativeElement;
  }

  public toggle(e) {

    e.preventDefault();
    e.stopPropagation();

    this.visibleToggle = !this.visibleToggle;
    this.updateType();
  }

  public updateType() {
    this.el.nativeElement.setAttribute('type', this.visibleToggle ? 'text' : 'password');
  }

  public ngOnInit() {
    this.visibleToggle = this.visible;
    this.updateType();
  }

  public ngAfterViewInit() {
    this.el.nativeElement.parentElement.parentElement
    .appendChild(this.el.nativeElement.querySelector('.fs-password-toggle'));
  }
}
