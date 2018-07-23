import { Component, OnDestroy } from '@angular/core';
import { FsPasswordService } from '../../../../src/services/fs-password.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'password-dialog-example',
  styleUrls: ['password-dialog-example.component.scss'],
  templateUrl: 'password-dialog-example.component.html',
})
export class PasswordDialogExampleComponent implements OnDestroy {
  private _sub: Subscription;

  constructor(private _fsPasswordService: FsPasswordService) {

  }

  public openDialog() {
    this._sub = this._fsPasswordService.open({
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
        },
        {
          label: 'Cancel',
          action: 'cancel',
          classList: ['specific-class']
        },
        {
          label: 'Forgot password',
          click: () => {
            console.log('forgot password');
          }
        },
      ]
    }).subscribe(
      (res) => {
        console.log('res', res);
      },
      (error) => {
        console.log('error', error);
      });

  }

  public ngOnDestroy() {
    this._sub && this._sub.unsubscribe();
  }

}
