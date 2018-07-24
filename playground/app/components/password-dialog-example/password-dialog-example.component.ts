import { Component, OnDestroy } from '@angular/core';
import { FsPasswordService } from '../../../../src/services/fs-password.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'password-dialog-example',
  styleUrls: ['password-dialog-example.component.scss'],
  templateUrl: 'password-dialog-example.component.html',
})
export class PasswordDialogExampleComponent {
  
  constructor(private fsPasswordService: FsPasswordService) {}

  public openDialog() {
    const subscription = this.fsPasswordService.open({
      minLength: 6,
      enableCurrentPassword: true, // enables current password
      exclude: ['123@123.com'],
      submit: (newPassword, oldPassword) => {
        return Observable.from(['200']);
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
    (res) => {
      console.log('res', res);
    },
    (error) => {
      console.log('error', error);
    });
  }
}
