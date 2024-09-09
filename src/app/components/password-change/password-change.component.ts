import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
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
      deps: [[new Optional(), NgForm]],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPasswordChangeComponent implements OnInit {

  @Input() public config: IFsPasswordConfig = null;

  @Input() public get currentPassword() {
    return this.currentPasswordValue;
  }
  
  public set currentPassword(value) {
    this.currentPasswordValue = value;
    this.currentPasswordChange.emit(this.currentPasswordValue);
  }

  @Output() public currentPasswordChange = new EventEmitter();

  @Input() public get newPassword() {
    return this.newPasswordValue;
  }
  
  public set newPassword(value) {
    this.newPasswordValue = value;
    this.newPasswordChange.emit(this.newPasswordValue);
  }

  @Output() public newPasswordChange = new EventEmitter();
  
  public newPasswordValue: string;
  public currentPasswordValue: string;

  public excludeFormFunction = ((formControl) => {
    this.config.exclude.forEach((word) => {
      if (this.newPasswordValue && this.newPasswordValue.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        throw new Error(`The password cannot be the word '${this.newPasswordValue}'`);
      }
    });
  });

  public ngOnInit() {
    this._setDefaultConfig();
  }

  private _setDefaultConfig() {
    this.config = { minLength: 6,
      enableCurrentPassword: true,
      exclude: [], ...this.config };
  }
}
