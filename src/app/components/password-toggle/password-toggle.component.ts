import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';


@Component({
  selector: '[fsPassword]',
  templateUrl: 'password-toggle.component.html',
  styleUrls: [ 'password-toggle.component.scss' ],
})
export class FsPasswordToggleComponent implements AfterViewInit, OnInit {

  public visibile = false;

  constructor(private el: ElementRef) {}

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
