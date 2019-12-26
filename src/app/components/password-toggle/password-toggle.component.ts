import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';


@Component({
  selector: '[fsPassword]',
  templateUrl: 'password-toggle.component.html',
  styleUrls: [ 'password-toggle.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPasswordToggleComponent implements AfterViewInit, OnInit {

  public visibile = false;

  constructor(private el: ElementRef) {}

  public get element() {
    return this.el.nativeElement;
  }

  public toggle(e) {

    e.preventDefault();
    e.stopPropagation();

    this.visibile = !this.visibile;
    this.updateType();
  }

  public updateType() {
    this.el.nativeElement.setAttribute('type', this.visibile ? 'text' : 'password');
  }

  ngOnInit() {
    this.updateType();
  }

  ngAfterViewInit() {
    this.el.nativeElement.parentElement.parentElement
    .appendChild(this.el.nativeElement.querySelector('.fs-password-toggle'));
  }
}
