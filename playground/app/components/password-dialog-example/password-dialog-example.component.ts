import { Component, inject } from '@angular/core';

import { FsPasswordService } from '@firestitch/password';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatButton } from '@angular/material/button';
import { FsFormModule } from '@firestitch/form';


@Component({
    selector: 'password-dialog-example',
    templateUrl: './password-dialog-example.component.html',
    styleUrls: ['./password-dialog-example.component.scss'],
    standalone: true,
    imports: [MatButton, FsFormModule],
})
export class PasswordDialogExampleComponent {
  private _passwordService = inject(FsPasswordService);


  public openDialog() {
    this._passwordService.open({
      title: 'Password title',
      subtitle: 'Password subtitle',
      minLength: 6,
      strength: true,
      enableCurrentPassword: true, // enables current password
      exclude: ['123456'],
      submit: (newPassword, oldPassword) => {
        return of({ password: newPassword, currentPassword: oldPassword })
          .pipe(
            delay(1000),
          );
      },
      buttons: [
        {
          label: 'Update Password',
          action: 'submit',
          color: 'primary',
        },
        {
          label: 'Forgot Password',
          classList: ['specific-class'],
        },
      ],
    }).subscribe(
      (res) => {
        console.log('res', res);
      },
      (error) => {
        console.log('error', error);
      },
    );
  }

}
