import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { FsPasswordService } from '../../../../src/services/fs-password.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'password-dialog-example',
  templateUrl: 'password-dialog-example.component.html',
})
export class PasswordDialogExampleComponent {

  constructor(private _fsMessage: FsMessage,
              private _fsPasswordService: FsPasswordService) {}

  public openDialog() {
    this._fsPasswordService.open({
      minLength: 6,
      enableCurrentPassword: true, // enables current password
      exclude: ['123@123.com'],
      done: (oldPassword, newPassword) => {
        return Observable.from(['200']);
      },
      buttons: [
        {
          label: 'Update password',
          action: 'done',
          color: 'primary'
        },
        {
          label: 'Cancel',
          action: 'cancel',
          color: 'primary'
        },
        {
          label: 'Forgot password',
          action: () => {
            console.log('forgot password');
          },
          color: 'warn'
        },
      ]
    }).then(
      (res) => {
        console.log('res', res);
      },
      (error) => {
        console.log('error', error);
      });

  }

}
