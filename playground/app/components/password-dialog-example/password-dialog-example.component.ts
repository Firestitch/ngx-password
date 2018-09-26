import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { FsPasswordService } from '../../../../src/services/fs-password.service';


@Component({
  selector: 'password-dialog-example',
  templateUrl: './password-dialog-example.component.html',
  styleUrls: ['./password-dialog-example.component.scss'],
})
export class PasswordDialogExampleComponent {

  constructor(private fsPasswordService: FsPasswordService) {}

  public openDialog() {
    const subscription = this.fsPasswordService.open({
      title: 'Password Title',
      minLength: 6,
      enableCurrentPassword: true, // enables current password
      exclude: ['123456'],
      submit: (newPassword, oldPassword) => {
        return of({ password: newPassword, currentPassword: oldPassword });
      },
      buttons: [
        {
          label: 'Update password',
          action: 'submit',
          color: 'primary'
        },
        {
          label: 'Forgot password',
          action: () => {
            subscription.unsubscribe();
          },
          classList: ['specific-class']
        },
        {
          label: 'Cancel',
          action: 'cancel'
        }
      ]
    }).subscribe(
      res => {
        console.log('res', res);
      },
      error => {
        console.log('error', error);
      }
    );
  }

}
