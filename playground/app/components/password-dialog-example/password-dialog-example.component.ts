import { Component } from '@angular/core';
import { FsPasswordService } from '@firestitch/password';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'password-dialog-example',
  templateUrl: './password-dialog-example.component.html',
  styleUrls: ['./password-dialog-example.component.scss'],
})
export class PasswordDialogExampleComponent {

  constructor(private fsPasswordService: FsPasswordService) {
  }

  public openDialog() {
    this.fsPasswordService.open({
      title: 'Password Title',
      minLength: 6,
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
          color: 'primary'
        },
        {
          label: 'Forgot Password',
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
