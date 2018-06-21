import {
  Component, EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { IFsPasswordConfig } from '../../interfaces';


@Component({
  selector: 'fs-password',
  templateUrl: './fs-password.component.html',
  styleUrls: ['./fs-password.component.scss']
})
export class FsPasswordComponent implements OnInit, OnDestroy {

  @Input() config: IFsPasswordConfig = null;

  public currentPasswordValue: string;
  @Input() get currentPassword() {
    return this.currentPasswordValue;
  }
  @Output() currentPasswordChange = new EventEmitter();
  set currentPassword(value) {
    this.currentPasswordValue = value;
    this.currentPasswordChange.emit(this.currentPasswordValue);
  }

  public newPasswordValue: string;
  @Input() get newPassword() {
    return this.newPasswordValue;
  }
  @Output() newPasswordChange = new EventEmitter();
  set newPassword(value) {
    this.newPasswordValue = value;
    this.newPasswordChange.emit(this.newPasswordValue);
  }

  public confirmPasswordValue: string;
  @Input() get confirmPassword() {
    return this.confirmPasswordValue;
  }
  @Output() confirmPasswordChange = new EventEmitter();
  set confirmPassword(value) {
    this.confirmPasswordValue = value;
    this.confirmPasswordChange.emit(this.confirmPasswordValue);
  }

  public hideCurrent: boolean;
  public hideNew: boolean;
  public hideConfirm: boolean;

  public excludeFormFunction = ((formControl) => {
    this.config.exclude.forEach(word => {
      if (this.newPasswordValue.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        throw "Password can't include these words";
      }
    })

  }).bind(this);

  constructor() {}

  ngOnInit() {
    this.setDefaultSettings();
    this.setDefaultConfig();
  }

  ngOnDestroy() {}

  private setDefaultSettings() {
    this.hideCurrent = true;
    this.hideNew = true;
    this.hideConfirm = true;
  }

  private setDefaultConfig() {
    this.config = Object.assign({
      minLength: 6,
      enableCurrentPassword: true,
      exclude: [],
    }, this.config);
  }
}
