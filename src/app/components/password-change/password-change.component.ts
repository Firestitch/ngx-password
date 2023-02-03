import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Optional, ChangeDetectionStrategy
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { controlContainerFactory } from '@firestitch/core';

import { IFsPasswordConfig } from '../../interfaces/password-config.interface';


@Component({
  selector: 'fs-password',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]]
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPasswordChangeComponent implements OnInit, OnDestroy {

  @Input() public config: IFsPasswordConfig = null;

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

  public excludeFormFunction = ((formControl) => {
    this.config.exclude.forEach((word) => {
      if (this.newPasswordValue && this.newPasswordValue.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        throw `The password cannot be the word '${this.newPasswordValue}'`;
      }
    })
  }).bind(this);

  public ngOnInit() {
    this.setDefaultConfig();
  }

  public ngOnDestroy() {}

  private setDefaultConfig() {
    this.config = Object.assign({
      minLength: 6,
      enableCurrentPassword: true,
      exclude: [],
    }, this.config);
  }
}
